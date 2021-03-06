const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    typeService: { type: String, required: true },
    voitureOption: [{ type: Schema.Types.ObjectId, ref: 'VoitureOptionService' }],
    chambreOption: [{ type: Schema.Types.ObjectId, ref: 'chambreOptionService' }],
    voyageOption: [{ type: Schema.Types.ObjectId, ref: 'voyageOptionService' }]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('services', schema);