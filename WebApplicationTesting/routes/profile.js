/**
 * Created by Daniel on 4/23/2016.
 */
var express = require('express');
var router = express.Router();
var userprofiles = require('../mongo/usermodel.js');

router.get('/', function(req, res, next) {
    var respObj = {ID: req.query.ID, fName: req.query.fName, lName: req.query.lName};
    var user = new userprofiles({ID: req.query.ID, fName: req.query.fName, lName: req.query.lName});
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.dir(user);
    });
    userprofiles.model("userprofiles").find(function (err, userprofiles) {
        res.send(userprofiles)
    })
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write('user is registered');
    //res.write(JSON.stringify(respObj));
    //res.end();
});
/*    userprofiles.find(function (err, users){
        if(err) return console.log(err);
        console.log(users);
        if (userprofiles.findOne({name: req.query.name})){
            console.log('hiphurra og goddag');
        }
        else{
            user.save(function(err, user){
            if(err) return console.error(err);
            console.dir(user);
            });
            res.writeHead(200, {'Content-Type':'text/html'});


    
            res.end();
        };
    });
});*/


module.exports = router;
//if (user.findOne({name: req.query.name})){console.log(Hiphurra)}