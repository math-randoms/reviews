const dbHelpers = require('../database/PostgreSQL/dbHelpers.js');

const controller = {
  postReview: (req, res) => {
    dbHelpers
      .postReview(req.body)
      .then(() => res.status(201).send())
      .catch(err => res.status(400).send(err));
  },

  getReviews: (req, res) => {
    let { propertyId } = req.params;
    console.log('hit');
    dbHelpers
      .getReview(propertyId)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400).send(err));
  },

  deleteReview: (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    dbHelpers
      .deleteReview(id)
      .then(() => res.status(202).send())
      .catch(err => res.status(400).send(err));
  },

  updateReview: (req, res) => {
    const { id } = req.params;
    dbHelpers
      .updateReview(req.body, id)
      .then(() => res.status(202).send())
      .catch(err => res.status(400).send(err));
  },

  getReviewsByRating: (req, res) => {
    const { propertyId, averageRating } = req.params;
    dbHelpers
      .getReviewsByRating(propertyId, averageRating)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400).send(err));
  }
};

module.exports = controller;
