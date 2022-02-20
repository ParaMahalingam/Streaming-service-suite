var axios = require("axios").default;
var express = require('express');
const cors = require("cors");
var app = express();
var bodyParser = require('body-parser');

var fs = require('fs');
var obj;
fs.readFile('stuff.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
//   console.log(obj);
});

app.use(cors());
app.options("*", cors());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3090; //Backend server port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/test', function (req, res) {
    res.json(obj);
});



// more routes for our API will happen here

router.get('/search', async function (req, res) {

    let searchKeyword = req.query.keyword;
    let searchType = req.query.type;
    let page = req.query.page;
    if (searchKeyword) {
        var options = {
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/search/pro',
            params: {
                country: 'gb',
                service: 'netflix',
                // service: 'netflix,prime,disney,apple,britbox',
                type: searchType,
                order_by: 'original_title',
                page: page,
                desc: 'true',
                language: 'en',
                keyword: searchKeyword,
                output_language: 'en'
            },
            headers: {
                'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
                'x-rapidapi-key': '61f923c15amsh0674aa7f36efa2bp1aeea4jsnd16c6d8e3719'
            }
        };

        await axios.request(options).then(function (response) {
            // console.log(response.data);
            res.send(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.send({ error: 'Please enter a search term' });
    }


});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);