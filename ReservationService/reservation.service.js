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
var Reservation = db.Reservation;

module.exports = {
    createReservationForCar
};


async function createReservationForCar(reservationParam) {
  //  console.log("option voiture : ", optionServiceParam.body)
    var reservation = new Reservation({
        dateFinReservation: reservationParam.body.dateFinReservation,
        dateDebutReservation: reservationParam.body.dateDebutReservation,
      

    })


    var voiture = await VoitureOptionService.findById(reservationParam.headers.idvoiture)

  
    await voiture.update({
        $addToSet: { reservation: reservation._id }
    })

    if (await reservation.save()) {
        console.log("service created ");


    } else {
        console.log("something wrong");

    }

  

    return reservation;
}


