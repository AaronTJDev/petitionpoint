const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('./User');

const organizationSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String },
        createdAt: { type: Date, default: Date.now },
        users: [Users],
        size: { type: String, enum: ['1-9', '10-19', '20-49', '50-249', '250+'], default: '1-9' }
    },
    { collection: 'organizations' }
);

const Organization = mongoose.model('Organization', organizationSchema)

module.exports = Organization;