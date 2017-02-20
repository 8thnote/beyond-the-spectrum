var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoSanitize = require('express-mongo-sanitize');

Resource = require('./models/resource');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Sanitize data
app.use(mongoSanitize({
  replaceWith: '_'
}));

mongoose.connect('mongodb://localhost/beyond-the-spectrum');
var db = mongoose.connection;

app.get('/', function (req, res) {
  res.send('Hello World. Yay!!!');
});

app.get('/api/resource', function (req, res) {
  Resource.getResources(function (err, resources) {
    if(err) {
      throw err;
    }
    res.json(resources);
  });
});

app.get('/api/resource/:_id', function (req, res) {
  Resource.getResourceById(req.params._id, function (err, resource) {
    if(err) {
      throw err;
    }
    res.json(resource);
  });
});

app.post('/api/resource', function (req, res) {
  var resource = req.body;

  Resource.createResource(resource, function (err, resource) {
    if(err) {
      throw err;
    }
    res.json(resource);
  });
});

app.listen(8080);
console.log('Running on port 8080');
