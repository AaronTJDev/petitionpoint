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

router.post('/create/:id', function( req,res ){
    let user = new userModel(req.body);

    userModel.create(user, function(err){
        if(err)
        {
            res.status(400).send(`${err.name} : ${err.errmsg}`);
        }
        else if(res.user)
        {
            res.status(201).send("Account successfully created.")
        }
    });
});

router.post('/logout', function(req,res) {
    req.session.destroy( function(err) {
        if(err) {
            res.status(400).send("Error logging out.");
        } else {
            res.status(200).send("Logout successful.")
        }
    });
})

router.post('/authenticate', function( req,res ){
    var authenticated = '';

    userModel.findOne({ email: req.body.email }, function( err, user){
        if(err) 
        {
            res.status(404).send("User not found with the email that was provided.");
            return;
        }

        if(req.body) 
        {
            authenticated = req.body.passwordHash === user.passwordHash;
        }

        if(authenticated) 
        {
            user.set('passwordHash', undefined);
            req.session.user = user;
            res.status(200).cookie('sid', req.session.id).send(user);
        }
        else 
        {
            res.status(400).send("Incorrect password or username provided."); 
        }
    });
});



router.put('/edit/:id', function( req,res ){
    userModel.findByIdAndUpdate( req.params.id , { fname: req.body.fname, lname: req.body.lname }, function (err, user){
        if ( err ) {
            res.status(404).send("User not found with the email that was provided.");
            return;
        }

        if ( user ) {
            user.save( err => {
                if (err) {
                    console.log(`${err.name} : ${err.errmsg}`)
                    res.status(400).send(`${err.name} : ${err.errmsg}`);
                }
                else {
                    res.status(200).send("Account successfully updated.")
                }
            });
        }
    });
});

router.put('/deactivate/:id', function ( req,res ){
    userModel.findByIdAndUpdate( req.params.id , { status: 'inactive' }, function (err, user){
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
                    res.status(200).send("Account successfully deactivated.")
                }
            });
        }
    });

});

module.exports = router;