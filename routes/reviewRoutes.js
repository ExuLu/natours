const express = require('express');

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );
router
  .route('/:id')
  .get(reviewController.getReviewById)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview,
  )
  .patch(reviewController.updateReview);

module.exports = router;
