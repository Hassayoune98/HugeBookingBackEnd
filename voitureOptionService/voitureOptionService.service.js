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
var Service = db.Service;

module.exports = {
    create,
    update,
    _delete
};


async function create(optionServiceParam) {
  //  console.log("option voiture : ", optionServiceParam.body)
    var optionservice = new VoitureOptionService({
        disponibility: optionServiceParam.body.disponibility,
        name: optionServiceParam.body.name,
        dateFinReservation: optionServiceParam.body.dateFinReservation,
        dateDebutReservation: optionServiceParam.body.dateDebutReservation,
        model: optionServiceParam.body.model,
        price: optionServiceParam.body.price,
        status: optionServiceParam.body.status

    })


    var service = await Service.findById(optionServiceParam.headers.idservice)

  
    await service.update({
        $addToSet: { voitureOption: optionservice._id }
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