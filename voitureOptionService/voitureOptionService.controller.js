const express = require('express');
const router = express.Router();
const voitureOptionService = require('./voitureOptionService.service');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', _delete);

module.exports = router;

function create(req, res, next) {
    console.log("test api ", req)
    voitureOptionService.create(req)
        .then(() => res.json({ message: 'option service created with success' }))
        .catch(err => next(err));
}


function update(req, res, next) {

    voitureOptionService.update(req.headers.id, req.body)
        .then(service => res.json({ service: service }))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    voitureOptionService.delete(req.headers.id)
        .then(() => res.json({ message: "option service deleted !" }))
        .catch(err => next(err));
}