var cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
import {dd} from './toolbox';

var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('address', (process.env.HOST || 'localhost'));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/cool', function(request, response) {
    response.send(cool());
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Allow CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
// GET
router.get('/', function(req, res) {
    const msg = JSON.stringify({
        message: 'hooraaaay! welcome to our api!'
    }, null, 4);
    res.setHeader('Content-Type', 'application/json');
    res.send(msg);
});
// POST
router.post('/', function(req, res) {
    console.log('Got a POST request for the homepage');
    res.send('Hello POST');
});
// DELETE
router.delete('/del_user', function(req, res) {
    console.log('Got a DELETE request for /del_user');
    res.send('Hello DELETE');
});
// This responds a GET request for the /list_user page.
router.get('/list_user', function(req, res) {
    console.log('Got a GET request for /list_user');
    res.send('Page Listing');
});
// This responds a GET request for abcd, abxcd, ab123cd, and so on
router.get('/ab*cd', function(req, res) {
    console.log('Got a GET request for /ab*cd');
    res.send('Page Pattern Match');
});
router.put('/test', function(req, res) {
    console.log('Got a PUT request for /test');
    res.send('PUT request');
});

router.put('/votes/:voteId/choices/:choiceId/vote', function(req, res) {
    const voteId = parseInt(req.params.voteId);
    const choiceId = parseInt(req.params.choiceId);
    console.log(`Got a PUT request for '/votes/${voteId}/choices/${choiceId}/vote`);
    console.info('from: ' + req.ip + ', for ' + req.hostname);
    dd(choiceId, 'choiceId', `VoteServer.router.put(/votes/${voteId}/choices/${choiceId}/vote)`);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(app.get('port'), function(error) {
    if (error) {
        console.error(error);
    } else {
        //var host = server.address().address;
        var host = app.get('address');
        var port = app.get('port');
        console.info('==> 🌎  Express is Listening on ' + host + ':' + port + '. Visit http://' + host + ':' + port + '/ in your browser.');
    }
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
