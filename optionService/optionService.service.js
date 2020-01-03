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
var OptionService = db.OptionService;

module.exports = {
    create,
    update,
    _delete
};


async function create(optionServiceParam) {
    var optionservice = new OptionService({
        diponibily: optionServiceParam.body.diponibily,
        name: optionServiceParam.body.name,



    })

    if (await optionservice.save()) {
        console.log("service created ");


    } else {
        console.log("something wrong");

    }

    return optionservice;
}


async function update(idOptionService, optionServiceParam) {

    const optionService = await OptionService.findById(idOptionService);
    if (!optionService) throw 'optionService not found';
    Object.assign(optionService, optionServiceParam);

    return await optionService.save();
}



async function _delete(idOptionService) {
    const optionService = await OptionService.findByIdAndRemove(idOptionService);

}