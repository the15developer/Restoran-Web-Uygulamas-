// Photo model using Mongoose (for MongoDB)
const mongoose = require('mongoose');

const photoSSchema = new mongoose.Schema({
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
  collection: 'PhotosSelected'
});

const PhotosSelected = mongoose.model('PhotosSelected', photoSSchema);

module.exports = PhotosSelected;
