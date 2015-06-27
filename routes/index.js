var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/mailchimp/', function (req, res, next) {
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var chimpurl = req.query.cmd.toString().replace("KEYVAL", "fb9902a9ffe53bb6fb20638e4036bcfd-us3");

    callback = function (response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.send(str);
        });
    }

    http.get(chimpurl, callback).end();
});


module.exports = router;
