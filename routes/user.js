const userModel = require('../models/User');

var express = require('express'),
    router = express.Router();

router.get('/:id', function(req,res) {
    // Check if server side session matches client side session.
    if( req.session.id === req.params.id )
    {
        res.status(200).send(req.session.user);
    } else {
        res.status(400).send("Session not found.")
    }
});

router.post('/logout', function(req,res) {
    console.log("route hit");
    console.log(req.session);
    req.session.destroy( function(err) {
        if ( err ) {
            res.status(400).send("Error logging out.");
        } else {
            res.status(200).send("Logout successful.")
        }
    });
})

router.post('/authenticate', function( req,res ){
    var authenticated = '';
    // Find user in the db.
    userModel.findOne({ email: req.body.email }, function( err, user){
        if ( err ) {
            console.log("user not found");
            res.status(404).send("User not found with the email that was provided.");
        }

        console.log(`LINE 35\n\n\ ${user}`);

        // Compare password set in body of request to password
        if( req.body ) {
            authenticated = req.body.passwordHash === user.passwordHash;
        }

        if ( authenticated ) {
            // Remove password hash from user info sent to client.
            user.set('passwordHash', undefined);
            // Store user info in session.
            req.session.user = user;
            // Set session id cookie, and send session data to client.
            res.status(200).cookie('sid', req.session.id).send(user);
        }
        else {
            console.log("Error with login: \n" + err + "\n");
            res.status(400).send("Incorrect password or username provided."); 
        }
    });
});

router.post('/create/:id', function( req,res ){
    // Format post data as a user model
    let user = new userModel(req.body);

    // Assign standard role
    user.roles.push("circulator");

    // Hash password
    const salt = 8;

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

router.put('/edit/:id', function( req,res ){
    console.log("update route hit")
    console.log(req.params)
    userModel.findByIdAndUpdate( req.params.id , { fname: req.body.fname, lname: req.body.lname }, function (err, user){
        console.log('userModel . findone used')
        if ( err ) {
            console.log("user not found");
            res.status(404).send("User not found with the email that was provided.");
        }

        if ( user ) {
            // Save updates to db
            user.save( err => {
                if (err) {
                    console.log(`${err.name} : ${err.errmsg}`)
                    res.status(400).send(`${err.name} : ${err.errmsg}`);
                }
                else { 
                    console.log("saving user to database");
                    res.status(200).send("Account successfully updated.")
                }
            });
        }
    });
});

router.delete('/delete/:id', function ( req,res ){
    res.send("delete")
});

module.exports = router;