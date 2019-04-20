const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  propertyId: Number
});

const reviewSchema = mongoose.Schema({
  id: Number,
  propertyId: Number,
  user: String,
  date: String,
  text: String,
  userImage: String,
  accuracyRating: Number,
  communicationRating: Number,
  cleanlinessRating: Number,
  locationRating: Number,
  checkInRating: Number,
  valueRating: Number,
  averageRating: Number
});

const Property = mongoose.model('Property', propertySchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Property, Review };
