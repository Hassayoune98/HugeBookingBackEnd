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
var Service = db.Service;

module.exports = {
    create,
    update,
    _delete,
    getOptionServiceVoitureById,
    getOptionServiceChambreById,
    getServiceByType
};


async function create(serviceParam) {
    //console.log("service param :", serviceParam.body.name);
        var service = new Service({
        name: serviceParam.body.name,
        address: serviceParam.body.address,
        phoneNumber: serviceParam.body.phoneNumber,
        typeService: serviceParam.body.typeService


    })

    console.log("service :: ", service)

    if (await service.save()) {
        console.log("service created ");


    } else {
        console.log("something wrong");

    }

    return service;
}


async function update(idService, serviceParam) {

    const service = await Service.findById(idService);
    console.log("hello ", service)
    console.log("hello ", idService)
    if (!service) throw 'Service not found';
    Object.assign(service, serviceParam);

    return await service.save();
}

async function getOptionServiceVoitureById(serviceParam) {
    const service = await Service.findById(serviceParam.headers.idservice).populate("voitureOption");
 //   console.log("liste optionservice ", service);
    return await service;

}


async function getOptionServiceChambreById(serviceParam) {
    const service = await Service.findById(serviceParam.headers.idservice).populate("chambreOption");
   // console.log("liste optionservice ", service);
    return await service;

}
async function _delete(idService) {
    const service = await Service.findByIdAndRemove(idService);

}


async function getServiceByType(serviceParam) {
 //   console.log("Hello")
//console.log("headers ", serviceParam.headers.type)
    var services = await Service.find({ typeService: serviceParam.headers.type })
  //  console.log("services :", services)
    return services;
}