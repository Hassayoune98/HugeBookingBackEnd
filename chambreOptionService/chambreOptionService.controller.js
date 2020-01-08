const express = require('express');
const router = express.Router();
const chambreOptionService = require('./chambreOptionService.service');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', _delete);
router.get('/getRoom', getChambreOptionById);

module.exports = router;

function create(req, res, next) {
    console.log("test api ", req)
    chambreOptionService.create(req)
        .then(() => res.json({ message: 'option service created with success' }))
        .catch(err => next(err));
}

function getChambreOptionById(req, res, next) {
    console.log("idroom", req.headers.idroom)
    chambreOptionService.getChambreOptionById(req.headers.idroom)
        .then(room => res.json({ room: room }))
        .catch(err => next(err));
}

function update(req, res, next) {

    chambreOptionService.update(req.headers.id, req.body)
        .then(service => res.json({ service: service }))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    chambreOptionService.delete(req.headers.id)
        .then(() => res.json({ message: "option service deleted !" }))
        .catch(err => next(err));
}