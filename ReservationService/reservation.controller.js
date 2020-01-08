const express = require('express');
const router = express.Router();
const reservationService = require('./reservation.service');

router.post('/create', createReservationForCar);


module.exports = router;

function createReservationForCar(req, res, next) {
    reservationService.createReservationForCar(req)
        .then(reservation => res.json({ reservation: reservation }))
        .catch(err => next(err));
}