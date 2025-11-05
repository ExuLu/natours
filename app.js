const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// CONSTANTS
const notFoundRes = {
  status: 'fail',
  message: 'Invalid id',
};

// I/O OPERATIONS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// UTILS
const writeToursFile = (tours, responseCallback) =>
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    responseCallback
  );
const findTourIndex = (tourId) => tours.findIndex((tour) => tour.id === tourId);

// ROUTE HANDLERS: TOURS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const tourIndex = findTourIndex(Number(req.params.id));

  if (tourIndex === -1) {
    return res.status(404).json(notFoundRes);
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour: tours[tourIndex],
    },
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  const tourIndex = findTourIndex(Number(req.params.id));

  if (tourIndex === -1) {
    return res.status(404).json(notFoundRes);
  }

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

const deleteTour = (req, res) => {
  const tourId = Number(req.params.id);
  const tourIndex = findTourIndex(tourId);

  if (tourIndex === -1) {
    return res.status(404).json(notFoundRes);
  }

  const updatedTours = tours.filter((tour) => tour.id !== tourId);
  const responseCallback = (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
  writeToursFile(updatedTours, responseCallback);
};

// ROUTE HANDLERS: USERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// ROUTES: TOURS
const userRouter = express.Router();
const tourRouter = express.Router();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

// ROUTES: USERS

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
