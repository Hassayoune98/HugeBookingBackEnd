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
var voyageOptionService = db.voyageOptionService;
var Service = db.Service;

module.exports = {
    create,
    update,
    _delete,
    getVoyageOptionById
};

async function create(optionServiceParam) {
  //  console.log("option voiture : ", optionServiceParam.body)
    var optionservice = new VoyageOptionService({
       
       
        dateAller: optionServiceParam.body.dateAller,
        dateDebut: optionServiceParam.body.dateDebut,
        status: optionServiceParam.body.status,
        depart: optionServiceParam.body.depart,
        arrive: optionServiceParam.body.arrive,
        price: optionServiceParam.body.price
        

    })


    var service = await Service.findById(optionServiceParam.headers.idservice)

  
    await service.update({
        $addToSet: { voyageOption: optionservice._id }
    })

    if (await optionservice.save()) {
        console.log("service created ");


    } else {
        console.log("something wrong");

    }

  

    return optionservice;
}


async function update(idOptionService, optionServiceParam) {

    const optionService = await VoyageOptionService.findById(idOptionService);
    if (!optionService) throw 'optionService not found';
    Object.assign(optionService, optionServiceParam);

    return await optionService.save();
}


async function getVoyageOptionById(idvol)
{
    const vol = await VoyageOptionService.findById(idvol);
    console.log("vol   :",vol)
    return vol;

}



async function _delete(idOptionService) {
    const optionService = await VolOptionService.findByIdAndRemove(idOptionService);

}