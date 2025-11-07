const Tour = require('../models/tourModel');

// MIDDLEWARES
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }

  next();
};

// CONTROLLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.getTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: updatedTour,
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
