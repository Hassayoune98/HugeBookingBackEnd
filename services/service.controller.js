const express = require('express');
const router = express.Router();
const serviceService = require('./service.service');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', _delete);
router.get('/getOptionServiceVoitureById', getOptionServiceVoiture);

module.exports = router;


function getOptionServiceVoitureById(req, res, next) {
    serviceService.getOptionServiceVoiture(req)
        .then(service => res.json({ service: service }))
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