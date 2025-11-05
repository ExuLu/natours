const fs = require('fs');

exports.notFoundRes = {
  status: 'fail',
  message: 'Invalid id',
};

exports.writeToursFile = (tours, responseCallback) => {
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    responseCallback
  );
};

exports.findTourIndex = (tours, tourId) =>
  tours.findIndex((tour) => tour.id === tourId);
