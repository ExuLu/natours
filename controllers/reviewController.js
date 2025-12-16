const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const getQueryWithFeatures = require('../utils/getQueryWithFeatures');
const factory = require('./handlerFactory');

exports.getReviews = catchAsync(async (req, res, next) => {
  const { tourId } = req.params;
  let filter = {};

  if (tourId) {
    filter = { tour: tourId };
  }

  const reviews = await getQueryWithFeatures(Review.find(filter), req.query);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReviewById = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOneHandler(Review);

exports.setTourUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;

  next();
});
