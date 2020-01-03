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
 register
};


async function register(userParam) {

    console.log(userParam.body)

    const Keys=[
        'a1z2z3e5e7e8e9Bee',
        'z4z5z7z8e64sq3Raa',
        'c1v25d48za9Ra45ae',
        'cksja7sh47ozjdDka',
        'cksjjdAh47ozjdDka',
        'ckosiOh785agjdDka',
        'ckLksheb785zjdDka'
    ]
    // validate
    if (await User.findOne({ $or: [{ username: userParam.body.username }, { email: userParam.body.email }] })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    if(!Keys.includes(userParam.body.key)){
        throw 'Invalide Admin key please try again';
    }



    var user = new User({
        username: userParam.body.username,
        firstName: userParam.body.firstName,
        lastName: userParam.body.lastName,
        email: userParam.body.email,
        role: "Admin",
    });

            // hash password
            if (userParam.body.password) {    
                user.hash = bcrypt.hashSync(userParam.body.password, 10);
                
            }

           await  user.save();

            if (user && bcrypt.compareSync(userParam.body.password, user.hash)) {
                const { hash, ...userWithoutHash } = user.toObject();
                const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
                return {
                    ...userWithoutHash,
                    token
                };
            }

            console.log("final user ::: ",user);

    // save user
  return  user;
}
