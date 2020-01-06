const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    dateFinReservation: { type: Date },
    dateDebutReservation: { type: Date },
    diponibility: { type: Boolean, unique: true, required: true },
    name: { type: String, required: true },
    price: { type: Number },
    status: { type: String },
    model: { type: String }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('VoitureOptionService', schema);