const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const petitionSchema = require('./Petition');

let turninSchema = new Schema (
    {
        _id: mongoose.Schema.Types.ObjectId,
        processedDate: { type: Date },
        petitions: [petitionSchema],
        payment: {
            initialBalance: Number,
            finalBalance: Number,
            initialValidity: Number,
            finalValidity: Number
        },
        validity: { type: Number }
    },
    { collection: 'turnins' }
);

module.exports = turninSchema;