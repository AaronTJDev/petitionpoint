const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petitionSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
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
        creatorId: { type: mongoose.Types.ObjectId, ref: 'User' },
        organizationId: { type: mongoose.Types.ObjectId },
        previousVersions: [{
            _id: { type: String, ref: 'Petitions' }
        }]
    },
    { collection: 'petitions' }
);

const Petition = mongoose.model('Petition', petitionSchema)

module.exports = Petition;