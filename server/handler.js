const url = require('url');
const dbHelpers = require('../database/PostgreSQL/dbHelpers.js');

// const sendResponse = (res, data, statusCode, headers) => {
//   res.writeHead(statusCode, headers).end(data);
// };

// const collectData = (req, callback) => {
//   let data = '';
//   req.on('data', chunk => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     callback(data);
//   });
// };

module.exports = (req, res) => {
  let reqUrl = url.parse(req.url, true);
  if (req.method === 'GET') {
    let propertyId = reqUrl.query.propertyId;
    let averageRating = reqUrl.query.averageRating;
    if (propertyId && !averageRating) {
      dbHelpers
        .getReview(propertyId)
        .then(data => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        })
        .catch(err => {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(err);
        });
    } else if (propertyId && averageRating) {
      dbHelpers
        .getReviewsByRating(propertyId, averageRating)
        .then(data => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        })
        .catch(err => {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(err);
        });
    }
  }
  // else if (req.method === 'POST') {
  //   collectData(req, formattedData => {
  //     dbHelpers
  //       .postReview(formattedData)
  //       .then(() =>
  //         sendResponse(response, 'Success', 200, {
  //           'Content-Type': 'application/json'
  //         })
  //       );
  //   });
  // }
};

// Routes

// router.route('/reviews').post(controller.postReview);

// router.route('/reviews/:propertyId').get(controller.getReviews);

// router
//   .route('/reviews/:id')
//   .delete(controller.deleteReview)
//   .put(controller.updateReview);

// router
//   .route('/reviews/:propertyId/:averageRating')
//   .get(controller.getReviewsByRating);
