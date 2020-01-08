const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    dateAller: { type: Date },
    dateDebut: { type: Date },
    status: { type: String, required: true },
    depart:{type:String,required:true},
    arrive:{type:String,required:true},
    price: { type: Number },
  

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('voyageOptionService', schema);
