// Photo model using Mongoose (for MongoDB)
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  }
},{
  collection: 'photos'
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
