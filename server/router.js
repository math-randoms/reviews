const router = require('express').Router();
const controller = require('./controller.js');

router.route('/reviews').post(controller.postReview);

router.route('/reviews/:propertyId').get(controller.getReviews);

router
  .route('/reviews/:id')
  .delete(controller.deleteReview)
  .put(controller.updateReview);

router
  .route('/reviews/:propertyId/:averageRating')
  .get(controller.getReviewsByRating);

module.exports = router;
