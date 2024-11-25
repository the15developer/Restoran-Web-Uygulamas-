const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    imageUrl: {
      type: String,
      required: false,
      default: '',
    }
  },{
   collection: 'foods',
   timestamps: true
  });

const food = mongoose.model('food', foodSchema);



module.exports = food;
