const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const getQueryWithFeatures = require('../utils/getQueryWithFeatures');

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

exports.getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
