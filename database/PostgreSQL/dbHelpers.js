const client = require('./index.js');

client
  .connect()
  .then(() => {
    console.log('PG connected');
  })
  .catch(err => console.error('PG connection error', err.stack));

const dbHelpers = {
  getReview: propertyId => {
    const getText = 'select * from reviews where propertyId = $1';
    const getValues = [propertyId];
    return client.query(getText, getValues);
  },

  postReview: review => {
    const postText =
      'insert into reviews (id, propertyid, "user", date, text, userimage, accuracyrating, communicationrating, cleanlinessrating, locationrating, checkInrating, valuerating, averagerating) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
    const postValues = [
      review.id,
      review.propertyId,
      review.user,
      review.date,
      review.text,
      review.userImage,
      review.accuracyRating,
      review.communicationRating,
      review.cleanlinessRating,
      review.locationRating,
      review.checkInRating,
      review.valueRating,
      review.averageRating
    ];
    return client.query(postText, postValues);
  },

  deleteReview: id => {
    const deleteText = 'delete from reviews where id = $1';
    const deleteValues = [id];
    return client.query(deleteText, deleteValues);
  },

  updateReview: (review, id) => {
    const updateText = 'update reviews set text = $1 where id = $2';
    const updateValues = [review.text, id];
    return client.query(updateText, updateValues);
  },

  getReviewsByRating: (propertyId, averageRating) => {
    const getByRatingText =
      'select * from reviews where propertyId = $1 and averageRating = $2';
    const getByRatingValues = [propertyId, averageRating];
    return client.query(getByRatingText, getByRatingValues);
  }
};

module.exports = dbHelpers;
