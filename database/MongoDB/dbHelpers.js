const Review = require('./models');

const dbHelpers = {
  getReview: propertyId => {
    return Review.find({ propertyId });
  },

  postReview: review => {
    return Review.collection.insertOne(review);
  },

  deleteReview: id => {
    return Review.findByIdAndDelete({ _id: id });
  },

  updateReview: (review, id) => {
    return Review.findOneAndUpdate({ _id: id }, { text: review.text });
  },

  getReviewsByRating: (propertyId, averageRating) => {
    return Review.find({ propertyId, averageRating });
  }
};

module.exports = dbHelpers;
