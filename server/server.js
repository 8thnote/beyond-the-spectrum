const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const reCAPTCHA = require('recaptcha2');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../client/', 'build')));

Resource = require('./models/resource');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Sanitize data
app.use(mongoSanitize({
  replaceWith: '_'
}));

mongoose.connect('mongodb://localhost/beyond-the-spectrum');
var db = mongoose.connection;

var recaptcha = new reCAPTCHA({
  siteKey:'6LflXBYUAAAAAOn-KJAUEiY0Bw995sNZWDwR0NZN',
  secretKey:'6LflXBYUAAAAAF1IvorEEagpJY7NOpe1dvDcBosO'
});


// ROUTES
app.get('/api/resource', function (req, res) {
  var limit = parseInt(req.param('limit'));

  Resource.getResources(function (err, resources) {
    if(err) {
      throw err;
    }
    res.json(resources);
  }, limit);
});

// app.get('/api/resource/:_id', function (req, res) {
//   Resource.getResourceById(req.params._id, function (err, resource) {
//     if(err) {
//       throw err;
//     }
//     res.json(resource);
//   });
// });

app.post('/api/resource', function (req, res) {
  var resource = req.body;

  recaptcha.validateRequest(req)
    .then(function(){
      // validated and secure
      Resource.createResource(resource, function (err, resource) {
        if (err) {
          throw err;
        }
        // Convert Mongoose object to JSON in order to remove the property
        var resource = resource.toJSON();
        // I don't want to show this property
        delete resource.approved;
        res.json(resource);
      });
    })
    .catch(function(errorCodes){
      // invalid
      res.json({formSubmit:false,errors:recaptcha.translateErrors(errorCodes)});// translate error codes to human readable text
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/', 'build', 'index.html'));
});

app.listen(8080);
console.log('Running on port 8080');
