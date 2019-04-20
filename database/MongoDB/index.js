const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviewsData', { useNewUrlParser: true }, () => {
  console.log('reviews connected');
});

db = mongoose.connection;

module.exports = db;