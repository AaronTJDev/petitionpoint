const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let petitionSchema = new Schema(
    {
        name: { type: String },
        state: { type: String },
        pricePerSignature: { type: Number },
        publishedDate: { type: Date },
        status: { type: String }
    },
    { collection: 'petitions' }
);

const Petition = mongoose.model('Petition', petitionSchema);

module.exports = Petition;