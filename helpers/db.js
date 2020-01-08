const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Service: require('../services/service.model'),
    VoitureOptionService: require('../voitureOptionService/voitureOptionService.model'),
    chambreOptionService: require('../chambreOptionService/chambreOptionService.model'),
    voyageOptionService: require('../VoyageOptionService/voyageOptionService.model'),
    Reservation: require('../ReservationService/reservation.model')
};