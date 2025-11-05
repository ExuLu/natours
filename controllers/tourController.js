const fs = require('fs');
const {
  notFoundRes,
  writeToursFile,
  findTourIndex,
} = require('../utils/tourUtils');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  const tourIndex = findTourIndex(tours, Number(val));

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  next();
};

// CONTROLLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  const tourIndex = findTourIndex(tours, Number(req.params.id));

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour: tours[tourIndex],
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  const responseCallback = (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  };
  writeToursFile(tours, responseCallback);
};

exports.updateTour = (req, res) => {
  const tourIndex = findTourIndex(tours, Number(req.params.id));

  const updatedTour = {
    ...tours[tourIndex],
    ...req.body,
  };
  const updatedTours = [...tours];
  updatedTours[tourIndex] = updatedTour;

  const responseCallback = (err) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  };
  writeToursFile(updatedTours, responseCallback);
};

exports.deleteTour = (req, res) => {
  const tourId = Number(req.params.id);

  const updatedTours = tours.filter((tour) => tour.id !== tourId);
  const responseCallback = (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
  writeToursFile(updatedTours, responseCallback);
};
