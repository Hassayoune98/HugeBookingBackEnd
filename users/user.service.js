const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('helpers/db');
const User = db.User;
const Role = require('helpers/role');
var generator = require('generate-password');
var async = require("async");
var crypto = require('crypto');
var nodemailer = require("nodemailer");
var mailer = require("mailer/mailer.service");




module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    reset,
    forget,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    console.log(user.username);

    const test = bcrypt.compareSync(password, user.hash);
    console.log(test);

    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    console.log("async getAll");
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

var token;
var passwordgen;
async function create(userParam) {

    let tokenTest = [];
    let passwordTest = [];

    crypto.randomBytes(20, function (err, buf) {
        token = buf.toString('hex');
        tokenTest.push(token);

    });

    // validate
    User.findOne({ $or: [{ username: userParam.body.username }, { email: userParam.body.email }] }).then(res => {
//        console.log(res)
        if (res) console.log('result', res)
        else {


            passwordgen = generator.generate({
                length: 10,
                numbers: true


            });

            var user = new User({
                username: userParam.body.username,
                firstName: userParam.body.firstName,
                lastName: userParam.body.lastName,
                email: userParam.body.email,
                role: userParam.body.role,
            });


            // hash password

            user.hash = bcrypt.hashSync(passwordgen, 10);

            // user reset token + token expires
            user.resetPasswordToken = tokenTest[0];
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            mailer.sendMail(user, userParam.headers.host, passwordgen);

            // save user
             user.save();

    }
    }).catch(e => console.error(e))

}


async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function reset(req, res) {
     //   console.log("reset start", req.query);
       const user = await User.findOne({resetPasswordToken: req.query.resetToken});
    //   console.log(user);
       if (!user) throw 'User not found';
       else{
        
           user.hash= bcrypt.hashSync(req.body.password,10);
           user.resetPasswordExpires=undefined;
           user.resetPasswordToken=undefined;
           user.save();
       }
      
       
}


async function forget(req,id) {

    let tokenTest = [];

    crypto.randomBytes(20, function (err, buf) {
        token = buf.toString('hex');
        tokenTest.push(token);

    });



    console.log(id);
   const user = await User.findById(id);

    console.log(user.username);



    if (!user) throw "not found";
    else {

        // user reset token + token expires
        user.resetPasswordToken = tokenTest[0];
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

     
        mailer.sendMail(user, req.headers.host, "");

        // save user
         user.save();

}

}
    
