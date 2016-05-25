/**
 * Created by Daniel on 4/23/2016.
 */
var mongoose = require('mongoose');
/*
mongoose.connect('mongodb://localhost/WiMBdb', function(err){
    if(err){
        console.log('connection error', err);
    }
    else{
        console.log('connection successful');
    }
});
*/
/*var GPSSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    z: Number
});

var gpscoordinates = mongoose.model('gpscoordinates', GPSSchema);
module.exports=gpscoordinates;

var s = new gpscoordinates({x:10, y:10, z:10});
s.save(function(err, s){
    if(err) return console.error(err);
    console.dir(s);
});

gpscoordinates.find(function(err, d) {
    if (err) return next(err);
    if (d.length == 0) s.save();
});*/

var userSchema = new mongoose.Schema({
    _id: Number,
    fName: String,
    lName: String,
    mail: String,
    pw: String,
    fbId: String,
    userCount: Number,
    versionKey: false,
});

var Userprofiles = mongoose.model('userprofiles', userSchema);
module.exports = Userprofiles;
