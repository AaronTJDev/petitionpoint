const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let turninSchema = new Schema (
    {
        _id: mongoose.Schema.Types.ObjectId,
        processedDate: { type: Date },
        petitions: { type: Array },
        payment: [{
            initialBalance: Number,
            finalBalance: Number,
            initialValidity: Number,
            finalValidity: Number
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        validity: { type: Number }
    },
    { collection: 'turnins' }
);

const Turnin = mongoose.model('Turnin', turninSchema);

module.exports = Turnin;