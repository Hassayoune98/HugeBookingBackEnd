const db = require('helpers/db');

var chambreOptionService = db.chambreOptionService;
var Service = db.Service;

module.exports = {
    create,
    update,
    _delete
};


async function create(optionServiceParam) {
    console.log("option chambre : ", optionServiceParam.body)
    var optionservice = new chambreOptionService({
        disponibility: optionServiceParam.body.disponibility,
        name: optionServiceParam.body.name,
        dateFinReservation: optionServiceParam.body.dateFinReservation,
        dateDebutReservation: optionServiceParam.body.dateDebutReservation,
        typeChambre: optionServiceParam.body.typeChambre,
        price: optionServiceParam.body.price,
        status: optionServiceParam.body.status

    })

    var service = await Service.findById(optionServiceParam.headers.idservice)
    console.log("id Service ", optionservice._id)
    await service.update({
        $addToSet: { chambreOption: optionservice._id }
    })

    if (await optionservice.save()) {
        console.log("service created ");


    } else {
        console.log("something wrong");

    }

    return optionservice;
}


async function update(idOptionService, optionServiceParam) {

    const optionService = await chambreOptionService.findById(idOptionService);
    if (!optionService) throw 'optionService not found';
    Object.assign(optionService, optionServiceParam);

    return await optionService.save();
}



async function _delete(idOptionService) {
    const optionService = await chambreOptionService.findByIdAndRemove(idOptionService);

}