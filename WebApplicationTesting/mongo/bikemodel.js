/**
 * Created by Daniel on 4/29/2016.
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
var bikeSchema = new mongoose.Schema({
    _id: String, 
    VIN: String,
    ownerId: String,
    brand: String,
    color: String,
    key: String,
    status: String,
    access: String,
    lock: String,
    latitude: String,
    longitude: String,
    versionKey: false
});

var Bikes = mongoose.model('bikes', bikeSchema);
module.exports = Bikes;