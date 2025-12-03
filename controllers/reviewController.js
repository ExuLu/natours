const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const getQueryWithFeatures = require('../utils/getQueryWithFeatures');

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await getQueryWithFeatures(Review, req.query);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
