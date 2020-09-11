const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let petitionSchema = new Schema(
    {
        name: { type: String },
        state: { type: String },
        pricePerSignature: { type: Number },
        publishedDate: { type: Date },
        status: { type: String },
        signatures: {
            valid: { type: Number },
            invalid: { type: Number },
            duplicates: { type: Number },
            notRegistered: { type: Number },
            illegible: { type: Number },
            wrongAddress: { type: Number }
        }
    },
    { collection: 'petitions' }
);

module.exports = petitionSchema;