const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    dateFinReservation: { type: Date },
    dateDebutReservation: { type: Date },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('reservation', schema);