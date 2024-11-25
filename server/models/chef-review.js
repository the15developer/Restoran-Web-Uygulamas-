const mongoose = require('mongoose');

const chefReviewSchema = new mongoose.Schema({
    username: String,
    chefID: Number,
    rating: Number,
    comment: String
  },{
   collection: 'chefReviews',
   timestamps: true
  });

const chefReview = mongoose.model('chefReview', chefReviewSchema);



module.exports = chefReview;
