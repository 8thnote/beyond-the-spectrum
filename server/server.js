var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Resource = require('./models/resource');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/beyond-the-spectrum');
var db = mongoose.connection;
console.log(db);

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
