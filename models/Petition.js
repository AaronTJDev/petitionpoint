const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const petitionSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String },
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
        creatorId: { type: Schema.ObjectId, ref: 'User' },
        organizationId: { type: Schema.ObjectId },
        previousVersions: [{
            _id: { type: Schema.ObjectId, ref: 'Petition' }
        }]
    },
    { collection: 'petitions' }
);

const Petition = mongoose.model('Petition', petitionSchema)

module.exports = Petition;