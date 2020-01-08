const express = require('express');
const router = express.Router();
const voyageOptionService = require('./voyageOptionService.service');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', _delete);
router.get('/getVol',getVoyageOptionById);
router.get('/vols',getOptionVols);
module.exports = router;
function getOptionVols(req,res,next){
    voyageOptionService.find((err,optionService) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(optionService);
      });
}
function create(req, res, next) {
    console.log("test api ", req)
    voyageOptionService.create(req)
        .then(() => res.json({ message: 'option service created with success' }))
        .catch(err => next(err));
}

function getVoyageOptionById(req, res, next) {
    console.log("idvol",req.headers.idvol)
    voyageOptionService.getVoyageOptionById(req.headers.idvol)
        .then(vol => res.json({ vol: vol }))
        .catch(err => next(err));
}

function update(req, res, next) {

    voyageOptionService.update(req.headers.id, req.body)
        .then(vol => res.json({ vol: vol }))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    voyageOptionService.delete(req.headers.id)
        .then(() => res.json({ message: "option service deleted !" }))
        .catch(err => next(err));
}