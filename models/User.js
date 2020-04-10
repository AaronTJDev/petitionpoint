const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash : { type: String, required: true },
        validity: { type: Number },
        roles: { type: Array },
        turnins: { type: Array }
    },
    { collection: 'users'}
)

const User = mongoose.model('User', userSchema);

module.exports = User;