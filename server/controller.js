const Model = require('../database/MongoDB/models.js');

module.exports = {
  getRating: (req, res) => {
    Model.Rating.countDocuments()
      .then(count => {
        let random = Math.random() * count;
        return Model.Rating.findOne().skip(random);
      })
      .then(data => {
        res.status(200).send(data);
      });
  },

  postRating: (req, res) => {},

  getReviewCount: (req, res) => {
    Model.Review.countDocuments().then(count => {
      res.status(200).send({ count });
    });
  },

  getReviewPage: (req, res) => {
    const page = req.params.page;
    Model.Review.find()
      .skip((page - 1) * 7)
      .limit(7)
      .then(data => {
        res.status(200).send(data);
      });
  }
};
