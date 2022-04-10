var axios = require("axios").default;
var express = require('express');
const cors = require("cors");
var app = express();
var bodyParser = require('body-parser');

app.use(cors());
app.options("*", cors());

var Database = require('./database')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3090; //Backend server port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Test route to make sure everything is working
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// more routes for our API will happen here

//get all advertisements
router.get('/ads', function (req, res) {
    Database.getAdvertisement(function (result) {
        res.send(result);
    });
})

//get all users
router.get('/users', function (req, res) {
    Database.getUsers(function (result) {
        res.send(result);
    });
})

router.post("/watchlist/add", (req, res) => {
    var watchlist = req.body;
  
    Database.addWatchList(watchlist, function (result) {
      console.log(result);
      res.send({ insertID: result });
    });
  });

  router.post("/updatepassword", (req, res) => {
    var UpdatePassword = req.body;
  
    Database.updatePassword(UpdatePassword, function (result) {
        res.send({ completed: true });
    });
  });


//get Watchlist by User ID
router.get('/watchlist/user/:id', function (req, res) {
    var UserID = req.params.id;

    Database.getWatchList(UserID, function (result) {
        res.send(result);
    });
})

//delete a Title
router.get('/watchlist/delete/:id', function (req, res) {
    var ID = req.params.id;

    Database.deleteTitle(ID, function (result) {
        res.send({ completed: true });
    });
})

//Mark as seen
router.get('/watchlist/seen/:id', function (req, res) {
    var ID = req.params.id;

    Database.markAsSeen(ID, function (result) {
        res.send({ completed: true });
    });
})

router.get("/ban", function (req, res) {
    var BanType = req.query.BanType
    var UserID = req.query.UserID
    console.log(UserID)

    Database.updateBan(BanType, UserID, function (result) {
        res.send({ completed: true });
    });
});


//Login user
router.post("/login", function (req, res) {
    var LoginInfo = req.body;
    Database.Login(LoginInfo, function (result) {
        if (result.length > 0) {
            res.send({
                loggedIn: true,
                ID: result[0].ID,
                Name: result[0].Name,
                Username: result[0].Username,
                Role: result[0].Role,
            });
        } else {
            res.send({ loggedIn: false });
        }
    });
});

//Search movies & series using keyword, type and platform
router.get('/search', async function (req, res) {

    let searchKeyword = req.query.keyword;
    let searchType = req.query.type;
    let page = req.query.page;
    let platform = req.query.platform;

    if (searchKeyword) {
        var options = {
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/search/pro',
            params: {
                country: 'gb',
                service: platform,
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


// All routes will be prefixed with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);