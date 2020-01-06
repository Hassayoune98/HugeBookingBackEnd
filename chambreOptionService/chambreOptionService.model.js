const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    dateFinReservation: { type: Date },
    dateDebutReservation: { type: Date },
    disponibility: { type: Boolean, required: true },
    name: { type: String, required: true },
    price: { type: Number },
    typeChambre: { type: String },
    status: { type: String }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('chambreOptionService', schema);