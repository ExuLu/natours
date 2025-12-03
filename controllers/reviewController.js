const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.createReview = catchAsync(async (req, res, next) => {
  const features = await Review.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reviews = await features.query;

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
