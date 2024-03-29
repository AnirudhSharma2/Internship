var express = require('express');
var router = express.Router();


let url    = 'http://api.openweathermap.org/data/2.5/weather?q='
let appId  = 'appid=d4915beec8d6aa5e1b7507223d2e9647';
let units  = '&units=metric'; 
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', {'body':'', forecast: ''});
});

router.post('/weather', function(req, res, next){
  let city = req.body.city;
  urlsPart = url.split("=")
  console.log(urlsPart)
  url = urlsPart[0]+"="+city+"&"+appId+units;
  // if (url.endsWith("=")){
  //   url = url+city+"&"+appId;
  // }
  // else{
  //   url.split("=")
  // }

 request(url, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      body = JSON.parse(body);
      console.log( body);
      if(error && response.statusCode != 200){
        throw error;
      }
    let country = (body.sys.country) ? body.sys.country : '' ;
    let forecast = "For city "+city+', country '+country;

    res.render('index', {body : body, forecast: forecast});
   });
});
module.exports = router;