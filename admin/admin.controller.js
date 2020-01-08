const express = require('express');
const router = express.Router();
const adminService = require('./admin.service');
const Role = require('helpers/role');
const authorize = require('helpers/authorize');



// routes
router.post('/register', register);


module.exports = router;

function register(req, res, next) {

    //cons
    console.log('Admin works')
    adminService.register(req)
        .then(result => res.json(result))
        .catch(err => next(err));
}