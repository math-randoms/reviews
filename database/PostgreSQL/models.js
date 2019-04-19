const Sequelize = require('sequelize');
const db = require('./index');

const Ratings = db.define('Rating', {
  accuracy: Sequelize.FLOAT,
  communication: Sequelize.FLOAT,
  cleanliness: Sequelize.FLOAT,
  location: Sequelize.FLOAT,
  checkIn: Sequelize.FLOAT,
  value: Sequelize.FLOAT,
  average: Sequelize.FLOAT
});

const Reviews = db.define('Review', {
  user: Sequelize.STRING(8),
  date: Sequelize.STRING(15),
  text: Sequelize.STRING(450),
  userImage: Sequelize.STRING(121)
});

db.sync()
  .then(() => console.log('Synced with PostgreSQL'))
  .catch(err => console.error(err));

module.exports.Ratings = Ratings;
module.exports.Reviews = Reviews;
