/**
 * Created by Daniel on 4/23/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


    mongoose.connect('mongodb://localhost/WiMBdb', function(err){
    if(err){
        console.log('connection error', err);
    }
    else{
        console.log('connection successful');
    }
});

router.post('/track', function(req,res,next){
    var Bikes = require('../mongo/bikemodel.js');
    var VIN = req.body.VIN;
    Bikes.findOne({VIN:VIN}, function(err,foundBike){
       if(err){
           console.log("error");
       }else{
        if(foundBike){
            var lattitude = foundBike.latitude;
            var longitude = foundBike.longitude;
            res.send(lattitude+","+longitude);
            console.log("success");
        }else{
            console.log("error");
            res.send("error");
        }
       }
    });
});

router.post('/reportFound', function (req,res,next){
    var Bikes = require('../mongo/bikemodel.js');
    var VIN = req.body.VIN;
    console.log(VIN);
    Bikes.findOne({VIN:VIN}, function(err,foundBike){
        if(err){
            console.log("error");
        }else{
            if(foundBike){
                foundBike.status = "false";
                foundBike.save(function(err, bike){
                    if(err){
                        console.error(err);
                    }
                    console.dir(bike);
                    res.send("success");
                });
            }else{
                console.log("error");
                res.send("error");
            }
        }
    });
});


router.post('/reportStolen', function (req,res,next){
    var Bikes = require('../mongo/bikemodel.js');
    var VIN = req.body.VIN;
    console.log(VIN);
    Bikes.findOne({VIN:VIN}, function(err,foundBike){
       if(err){
           console.log("error");
       }else{
           if(foundBike){
               foundBike.status = "true";
               foundBike.save(function(err, bike){
                   if(err){
                       console.error(err);
                   }
                   console.dir(bike);
                   res.send("success");
               });
           }else{
               console.log("error");
               res.send("error");
           }
       }
    });
});

router.post('/bike', function(req, res, next){
    var Bikes = require('../mongo/bikemodel.js');
    var brand = req.body.brand;
    var color = req.body.color;
    var vin = req.body.vin;
    var ownerId = req.body.ownerId;
    var bikeId = req.body.bikeId;
    console.log(vin +" - "+ bikeId+" - "+ ownerId);
    Bikes.findOne({VIN:vin}, function(err, foundBike){
        if(err){
            console.log("error");
        }else{
            if(foundBike){
                    console.log("already registered");
                    res.send("already registered");
            }else{
                var bike = new Bikes({_id: bikeId,VIN: vin, brand: brand, color: color, ownerId: ownerId ,status: "false", access: "none",lock: "false",latitude: "55.673156", longitude: "12.545649"});
                bike.save(function(err, bike){
                    if(err) return console.error(err);
                    console.dir(bike);
                });
                console.log("success");
                res.send("success");
            }
        }
    });
});

router.post('/register', function(req, res, next){
    var Userprofiles = require('../mongo/usermodel.js');
    var mail = req.body.email;
    var password = req.body.pw;
    var fName = req.body.fName;
    var lName = req.body.lName;
    Userprofiles.findOne({mail: mail}, function(err, foundUser){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(foundUser){
                res.send("error");
                console.log("Mail already in use.");
            }else{
                Userprofiles.findOne({_id: 0}, function(err, foundUsers){
                    if(err) {
                        console.log(err);
                        res.status(500).send();
                    } else {
                        var userCount = foundUsers;
                        var newID = userCount.userCount;
                        newID++;
                        userCount.userCount = newID;
                        foundUsers.save(function(err, updatedObject){
                            if(err){
                                console.log(err);
                                res.status(500).send();
                            } else {
                                var user = new Userprofiles({_id: newID, fName: fName, lName: lName, mail: mail, pw: password});
                                console.log("Email: "+mail +" - First Name: "+ fName + " - Last Name: "+lName+ " - PW: "+password);
                                res.send(newID+","+fName+","+lName);
                                console.log("Registered as Owner ID: " + newID);
                                user.save(function (err, user) {
                                    if (err){
                                        console.error(err);
                                    }
                                    console.dir(user);
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});


router.post('/facebookLogin', function(req, res, next){
    var Userprofiles = require('../mongo/usermodel.js');
    var Bikes = require('../mongo/bikemodel.js');
    var fbId = req.body._id;
    var fName = req.body.fName;
    var lName = req.body.lName;


    Userprofiles.findOne({fbId: fbId}, function(err, foundUsers){
        if(err) {
            console.log(err);
            res.status(500).send();
        } else{
            if(foundUsers){
                console.log("Facebook Login Success");
                res.send(foundUsers._id+","+foundUsers.fName+","+foundUsers.lName);
            } else{
                Userprofiles.findOne({_id: 0}, function(err, foundUsers){
                    if(err) {
                        console.log(err);
                        res.status(500).send();
                    } else {
                        var userCount = foundUsers;
                        var newID = userCount.userCount;
                        newID++;
                        userCount.userCount = newID;
                        foundUsers.save(function(err, updatedObject){
                            if(err){
                                console.log(err);
                                res.status(500).send();
                            } else {
                                var user = new Userprofiles({_id: newID, fName: fName, lName: lName, fbId: fbId});
                                console.log(fbId +" - "+ fName + " - "+lName);
                                res.send(newID+","+fName+","+lName);
                                console.log("Registered as Owner ID: " + newID);
                                user.save(function (err, user) {
                                    if (err){
                                        console.error(err);
                                    }
                                    console.dir(user);
                                });
                            }
                        });
                    }
                });

            }
        }
    });
});

router.post('/login', function(req, res, next){
    var Userprofiles = require('../mongo/usermodel.js');
    var Bikes = require('../mongo/bikemodel.js');
    var mail = req.body.email;
    var pw = req.body.password;
    console.log(mail +" - "+ pw);
    Userprofiles.findOne({mail: mail, pw: pw}, function(err, foundUser){
        if(err) {
            res.send("error");
            console.log("Failed Login");
        } else{
            //res.json(foundBikes);
            var fName = foundUser.fName;
            var lName = foundUser.lName;
            var id = foundUser._id;
            res.send(id+","+fName+","+lName);
            console.log("success");

        }
    });
});

router.post('/changelock', function (req, res, next) {
    var Bikes = require('../mongo/bikemodel.js');
    var bikeId = req.body._id;
    Bikes.findOne({_id: bikeId}, function(err,foundBike){
        if(err){
            res.send("error");
            console.log("error");
        }else{
            if(foundBike){
                foundBike.lock = req.body.lock;
                foundBike.save(function(err, updatedObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    } else{
                        res.send("success");
                    }
                });
            }else{
                res.send("error");
                console.log("error");
            }
        }
    });
});

router.post('/symmetrickey', function (req, res, next) {
    var Bikes = require('../mongo/bikemodel.js');
    var bikeId = req.body._id;
    Bikes.findOne({_id: bikeId}, function(err,foundBike){
        if(err){
            res.send("error");
            console.log("error");
        }else{
            if(foundBike){
                foundBike.key = req.body.key;
                foundBike.save(function(err, updatedObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    } else{
                        res.send("success");
                    }
                });
            }else{
                res.send("error");
                console.log("error");
            }
        }
    });
});

router.post('/checkbike', function (req, res, next) {
    var Bikes = require('../mongo/bikemodel.js');
    var ownerId = req.body.ownerId;
    var bikeId = req.body._id;
    Bikes.findOne({_id: bikeId, ownerId: ownerId}, function(err,foundBike){
        if(err){
            res.send("error");
            console.log("error");
        }else{
            if(foundBike){
                res.send("success");
                console.log("success");
            }else{
                res.send("error");
                console.log("error");
            }
        }
    });
});

router.post('/loginBikes', function(req, res, next){
    var Bikes = require('../mongo/bikemodel.js');
    var ownerId = req.body._id;
    Bikes.find({ownerId: ownerId},function(err,foundBikes){
       if(err){
           res.send("error");
           console.log("error");
       } else{
           if(foundBikes){
               res.json(foundBikes);
               console.log("success");
           }
       }
    });
});

router.post('/updateGps', function(req, res, next){
    var Bikes = require('../mongo/bikemodel.js');
    var _id = req.query._id
    console.log(_id);

    Bikes.findOne({_id: _id}, function(err, foundObject){
        if(err) {
            console.log(err);
            res.status(500).send();
        } else{
            if(!foundObject){
                res.status(404).send();
            } else{
               if(req.query.latitude){
                   foundObject.latitude = req.query.latitude;
               }
                if(req.query.longitude) {
                    foundObject.longitude = req.query.longitude;
                }
                foundObject.save(function(err, updatedObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    } else{
                        res.json(updatedObject);
                    }
                });
            }
        }
    });
});

router.get('/retrieveGps', function(req, res, next){
    var Bikes = require('../mongo/bikemodel.js');
    var vin = req.query.VIN;
    console.log(vin);
    Bikes.findOne({VIN: vin}, function(err, foundObject){
        if(err){
            console.log(err);
            res.status(500).send();
        } else {
            res.send(foundObject);
        }
    });
});

router.get('/profile', function(req, res, next) {
    var Userprofiles = require('../mongo/usermodel.js');
    var user = new Userprofiles({ID: req.query.ID, fName: req.query.fName, lName: req.query.lName});
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.dir(user);
    });
   // res.writeHead(200, {'Content-Type': 'text/html'});
    Userprofiles.model("userprofiles").find(function (err, userprofiles) {
        res.send(userprofiles)
    })
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write('user is registered');
    //res.write(JSON.stringify(respObj));
    //res.end();
});


module.exports = router;