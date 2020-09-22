const petitionSchema = require('../models/Petition')

var express = require('express'),
    router = express.Router();

router.get('/petitions/:id', function( req,res ){
    res.send("get")
});

router.post('/new/:id', function( req,res ){
    let petition = new petitionSchema(req.body);
    
    console.log(petition);

    res.status(200).send()
});

router.put('/edit/:id', function( req,res ){
    res.send("edit")
});

router.delete('/delete/:id', function ( req,res ){
    res.send("delete")
});


module.exports = router;