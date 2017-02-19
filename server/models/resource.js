var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
  approved: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  purchase_link: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: ''
  },
  website_link: {
    type: String,
    required: true
  }
});

var Resource = module.exports = mongoose.model('Resource', resourceSchema);

module.exports.getResources = function (callback, limit) {
  Resource.find(callback).limit(limit);
}

module.exports.getResourceById = function (_id, callback) {
  Resource.findById(_id, callback);
}


// Create Resource
module.exports.createResource = function (resource, callback) {
  // Do auth check here to allow approved true
  resource.approved = false;
  Resource.create(resource, callback);
}
