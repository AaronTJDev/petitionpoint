const petitionModel = require('../models/Petition')
const mongoose = require('mongoose');

var express = require('express'),
    router = express.Router();

router.get('/:userId/:id', function( req,res ){
    res.send("get")
});

router.get('/:userId', function( req,res ){
    var userId = mongoose.Types.ObjectId(req.params.userId);

    petitionModel.find({creatorId: userId}, function(err, petitions){
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else
        {
            res.status(200).send(petitions);
        }
    });
});

router.post('/create/:id', function( req,res ){
    let petition = new petitionModel(req.body);
    
    petitionModel.create(petition, function( err, newPetition ){
        if(err)
        {
            res.status(400).send();
        }
        else
        {
            console.log(petition.creatorId);
            res.status(200).send(newPetition);
        }
    });

    return
});

router.put('/edit/:id', function( req,res ){
    res.send("edit")
});

router.delete('/delete/:id', function ( req,res ){
    res.send("delete")
});


module.exports = router;