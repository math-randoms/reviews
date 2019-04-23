const Review = require('./models');

const dbHelpers = {
  getReview: propertyId => {
    return Review.find({ propertyId });
  },

  postReview: review => {
    return Review.insertOne(review);
  },

  deleteReview: id => {
    return Review.findByIdAndDelete({ _id: id });
  },

  updateReview: (review, id) => {
    return Review.findByIdAndUpdate(
      { _id: id },
      { text: review.text },
      { upsert: true }
    );
  },

  getReviewsByRating: (propertyId, averageRating) => {
    return Review.find({ propertyId, averageRating });
  }
};

module.exports = dbHelpers;
