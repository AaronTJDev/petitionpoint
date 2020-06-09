const userModel = require('../models/User')
const bcrypt = require('bcryptjs');

var express = require('express'),
    router = express.Router();

router.get('/:id', function(req,res) {
    // Check if server side session matches client side session.
    if( req.session.id === req.params.id )
    {
        res.send(req.session.user);
    }
});

router.post('/login/u', function( req,res ){
    // Find user in the db.
    userModel.findOne({ email: req.body.email }, function( err, user){
        if ( err ) {
            res.status(404).send("User not found with the email that was provided.");
        }

        // Compare password set in body of request to password
        bcrypt.compare( req.body.passwordHash , user.passwordHash).then( function( authenticated ) {
            if ( authenticated ) {
                // Remove password hash from user info sent to client.
                user.set('passwordHash', undefined);
                // Store user info in session.
                req.session.user = user;
                // Set session id cookie, and send session data to client.
                res.cookie('sid', req.session.id).status(200).send(user);
            }
            else {
                res.status(400).send("Incorrect password or username provided."); 
            }
        });
    });
});

router.post('/create/:id', function( req,res ){
    // Format post data as a user model
    let user = new userModel(req.body);

    // Assign standard role
    user.roles.push("circulator");

    // Hash password
    const salt = 8;
    var hashed = ''
    bcrypt.hash(user.passwordHash, salt, function( err, hash ){
        if(err){
            res.status(500).send();
        }

        console.log('hashing password')
        user.passwordHash = hash;

        // Save user to db
        user.save( err => {
            if (err) {
                console.log(`${err.name} : ${err.errmsg}`)
                res.status(400).send(`${err.name} : ${err.errmsg}`);
            }
            else { 
                console.log("saving user to database");
                res.status(201).send("Account successfully created.")
            }
        });
    });
});

router.put('/edit/:id', function( req,res ){
    res.send("edit")
});

router.delete('/delete/:id', function ( req,res ){
    res.send("delete")
});

module.exports = router;