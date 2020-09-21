const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let petitionSchema = new Schema(
    {
        name: { type: String },
        state: { type: String },
        description: { type: String }, 
        payPerSignature: { type: Number },
        publishedDate: { type: Date, default: Date.now() },
        status: { type: String, enum: ['inactive', 'active', 'closed'], default: 'inactive' },
        signatures: {
            valid: { type: Number },
            invalid: { type: Number },
            duplicates: { type: Number },
            notRegistered: { type: Number },
            illegible: { type: Number },
            wrongAddress: { type: Number }
        },
        previousVersions: [ this ]
    },
    { collection: 'petitions' }
);

module.exports = petitionSchema;