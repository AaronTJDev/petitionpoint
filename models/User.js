const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const turninSchema = require('./User');

const userSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        fname: { type: String, required: true, maxlength:35 },
        lname: { type: String, required: true, maxlength:35 },
        email: { type: String, required: true, index: { unique: true }, maxlength:254 },
        passwordHash : { type: String, required: true },
        validity: { type: Number },
        role: { type: String, enum: ['admin', 'coordinator', 'circulator'], default: 'circulator' },
        turnins: [turninSchema],
        createdAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' }
    },
    { collection: 'users'}
)

userSchema.pre('save', function ( next ){
    var user = this;

    if (!user.isModified('password')){
        return next();
    } 

    // salt round for hashing
    const salt = 8;
    
    // Hash password
    bcrypt.hash(user.passwordHash, salt, function( err, hash ){
        if(err){
            res.status(500).send();
        }
        user.passwordHash = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;