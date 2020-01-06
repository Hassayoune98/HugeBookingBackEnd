const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('helpers/db');
const Role = require('helpers/role');
var generator = require('generate-password');
var async = require("async");
var crypto = require('crypto');
var nodemailer = require("nodemailer");
var mailer = require("mailer/mailer.service");
var VoitureOptionService = db.VoitureOptionService;

module.exports = {
    create,
    update,
    _delete
};


async function create(optionServiceParam) {
    var optionservice = new VoitureOptionService({
        diponibility: optionServiceParam.body.diponibility,
        name: optionServiceParam.body.name,
        dateFinReservation: optionServiceParam.body.dateFinReservation,
        dateDebutReservation: optionServiceParam.body.dateDebutReservation,
        model: optionServiceParam.body.model,
        price: optionServiceParam.body.price,
        status: optionServiceParam.body.status

    })

    if (await optionservice.save()) {
        console.log("service created ");


    } else {
        console.log("something wrong");

    }

    return optionservice;
}


async function update(idOptionService, optionServiceParam) {

    const optionService = await VoitureOptionService.findById(idOptionService);
    if (!optionService) throw 'optionService not found';
    Object.assign(optionService, optionServiceParam);

    return await optionService.save();
}



async function _delete(idOptionService) {
    const optionService = await VoitureOptionService.findByIdAndRemove(idOptionService);

}