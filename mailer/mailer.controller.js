const express = require('express');
const router = express.Router();
const mailerService = require('./mailer.service');


router.post('/sendMail', send);
module.exports = router;

function send(req, res, next) {
    mailerService.sendMail(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

