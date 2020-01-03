const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hash: { type: String, required: true },
    role: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', schema);