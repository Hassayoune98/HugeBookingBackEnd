const express = require('express');
const router = express.Router();
const serviceService = require('./service.service');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', _delete);
router.get('/getOptionServiceVoitureById', getOptionServiceVoitureById);
router.get('/getOptionServiceVoyageById', getOptionServiceVoyageById);
router.get('/getOptionServiceChambreById', getOptionServiceChambreById);
router.get('/getServiceByType', getServiceByType);

module.exports = router;

function getOptionServiceVoyageById(req, res, next) {
    serviceService.getOptionServiceVoyageById(req)
        .then(service => res.json({ service: service }))
        .catch(err => next(err));
}

function getOptionServiceVoitureById(req, res, next) {
    serviceService.getOptionServiceVoitureById(req)
        .then(service => res.json({ service: service }))
        .catch(err => next(err));
}

function getOptionServiceChambreById(req, res, next) {
    serviceService.getOptionServiceChambreById(req)
        .then(service => res.json({ service: service }))
        .catch(err => next(err));
}

function getServiceByType(req, res, next) {
    serviceService.getServiceByType(req)
        .then(services => res.json({ services: services }))
        .catch(err => next(err));
}

function create(req, res, next) {
    serviceService.create(req)
        .then(() => res.json({ message: 'service created with success' }))
        .catch(err => next(err));
}


function update(req, res, next) {


    serviceService.update(req.headers.idservice, req.body)
        .then(service => res.json({ service: service }))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    serviceService._delete(req.headers.idservice)
        .then(() => res.json({ message: "service deleted !" }))
        .catch(err => next(err));
}