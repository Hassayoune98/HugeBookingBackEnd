const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    diponibily: { type: String, unique: true, required: true },
    name: { type: String, required: true },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('optionService', schema);