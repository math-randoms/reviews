const pg = require('pg');
const connectionString =
  process.env.DATABASE_URL || 'postgres://localhost:5432/reviewsData';

const client = new pg.Client(connectionString);

const dbHelpers = {
  getReview: propertyId => {
    return client.query(
      `select * from reviews where propertyId = ${propertyId}`
    );
  },

  postReview: review => {
    return client.query(
      `insert into reviews (propertyId, "user", date, text, userImage, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkInRating, valueRating, averageRating) values (${
        review.propertyId
      }, ${review.user}, ${review.date}, ${review.text}, ${review.userImage}, ${
        review.accuracyRating
      }, ${review.communicationRating}, ${review.cleanlinessRating}, ${
        review.locationRating
      }, ${review.checkInRating}, ${review.valueRating}, ${
        review.averageRating
      })`
    );
  },

  deleteReview: propertyId => {
    return client.query(`delete from reviews where propertyId = ${propertyId}`);
  },

  updateReview: (review, id) => {
    return client.query(
      `update reviews set text = ${review.text} where id = ${id}`
    );
  },

  getReviewsByRating: (propertyId, averageRating) => {
    return client.query(
      `select * from reviews where propertyId = ${propertyId} and averageRating = ${averageRating}`
    );
  }
};

module.exports = dbHelpers;
