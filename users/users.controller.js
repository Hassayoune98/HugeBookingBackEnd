const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const Role = require('helpers/role');
const authorize = require('helpers/authorize');

// routes
router.post('/authenticate', authenticate);
router.post('/register', authorize(Role.Admin), register);
router.get('/', authorize(Role.Admin), getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/reset', reset);
router.post('/forget', forgetPassword);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req)
        .then(result => res.json({ result: result }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log("get all here");
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function forgetPassword(req, res, next) {
    userService.forget(req, req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json('User updated'))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => next(err));
}


function reset(req, res, next) {
    userService.reset(req)
        .then(result => {
            console.log(result)
            res.status(404).json({ result: "User not found or Token has expired " })

        })
        .catch(err => next(err));

}