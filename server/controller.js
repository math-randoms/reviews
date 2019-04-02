const Model = require('../database/models.js');
const mongoose = require('mongoose');

module.exports = {
  getRating: (req, res) => {
    Model.Rating.count()
      .then((count) => {
        let random = Math.random() * count;
        return Model.Rating.findOne().skip(random);
      })  
      .then((data) => {
        res.status(200).send(data)
      })
  },

  postRating: (req, res) => {
    
  },

  getReviewCount: (req, res) => {
    Model.Review.countDocuments()
      .then((count) => {
        res.status(200).send({count});
      }) 
  },

  getReviewPage: (req, res) => {
    const page = req.params.page;
    Model.Review.find().skip(page * 7).limit(7)
    .then((data) => {
      res.status(200).send(data)
    })
  }  
}