const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        fname: { type: String, required: true, maxlength:35 },
        lname: { type: String, required: true, maxlength:35 },
        email: { type: String, required: true, index: { unique: true }, maxlength:254 },
        passwordHash : { type: String, required: true },
        validity: { type: Number },
        roles: { type: Array },
        turnins: { type: Array }
    },
    { collection: 'users'}
)

userSchema.pre('save', function ( next ){
    var user = this;

    if (!user.isModified('password')){
        return next();
    } 

    const salt = 8;
    
    bcrypt.hash(user.passwordHash, salt, function( err, hash ){
        if(err){
            res.status(500).send();
        }

        console.log('hashing password')
        user.passwordHash = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;