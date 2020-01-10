const express = require('express');
const router = express.Router();
const reservationService = require('./reservation.service');

router.post('/create', createReservationForCar);
router.post('/create-reservation-room', createReservationForRoom);
router.get('/getReservations',getReservationByType);

module.exports = router;

function createReservationForCar(req, res, next) {
    reservationService.createReservationForCar(req)
        .then(reservation => res.json({ reservation: reservation }))
        .catch(err => next(err));
}

function createReservationForRoom(req, res, next) {
    reservationService.createReservationForRoom(req)
        .then(reservation => res.json({ reservation: reservation }))
        .catch(err => next(err));
}


function getReservationByType (req,res, next ){
    reservationService.getReservationByType()
    .then(reservation => res.json({ reservation: reservation }))
    .catch(err => next(err));
}