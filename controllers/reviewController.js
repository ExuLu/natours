const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
