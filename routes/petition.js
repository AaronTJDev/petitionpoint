const path = require('path');

var express = require('express'),
    router = express.Router();

router.get('/', function( req,res ){
    res.send("get")
});

router.post('/create/:id', function( req,res ){
    res.send("create");
});

router.put('/edit/:id', function( req,res ){
    res.send("edit")
});

router.delete('/delete/:id', function ( req,res ){
    res.send("delete")
});

module.exports = router;