const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

   
    disponibility: { type: String },
    name: { type: String, required: true },
    price: { type: Number },
    status: { type: String },
    model: { type: String },
    reservation: { type: Schema.Types.ObjectId, ref: 'reservation' }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('VoitureOptionService', schema);