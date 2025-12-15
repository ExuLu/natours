const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const getQueryWithFeatures = require('../utils/getQueryWithFeatures');

exports.getReviews = catchAsync(async (req, res, next) => {
  const { tourId } = req.params;

  let reviews;
  if (!tourId) {
    reviews = await getQueryWithFeatures(Review.find(), req.query);
  } else {
    reviews = await getQueryWithFeatures(
      Review.find({ tour: { $eq: tourId } }),
      req.query,
    );
  }

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
  const { tourId } = req.params;
  if (!tourId) {
    next(new AppError('Please, provide the tour id', 400));
  }
  const newReview = await Review.create({
    ...req.body,
    user: req.user._id,
    tour: req.params.tourId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
