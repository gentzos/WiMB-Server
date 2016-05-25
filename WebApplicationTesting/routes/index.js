var express = require('express');
var router = express.Router();
var gpscoordinates = require('../mongo/usermodel.js');

/* GET home page. */

router.get('/', function(req, res, next){


  gpscoordinates.find(function(err, t){
    if(err) return next(err);

    res.writeHead(200, {'Content-Type':"text/html"});
    res.write('DATA ARE:'+ "<br/>");
    for(i in t){
      res.write('x : '+t[i].x);
      res.write(' y : '+t[i].y);
      res.write(' z : '+t[i].z + "<br/>");
    }
  
    res.end();
  });
});

router.post('/', function(req, res, next){
  
})




/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
