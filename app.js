const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const apiUrl = "/api/v1/tours";
const notFoundRes = {
  status: "fail",
  message: "Invalid id",
};

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const findTourIndex = (tourId) => tours.findIndex((el) => el.id === tourId);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
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
    status: "success",
    data: {
      tour: tours[tourIndex],
    },
  });
};

const createTour = (req, res) => {
  const newId = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
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

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const tourId = Number(req.params.id);
  const tourIndex = findTourIndex(tourId);

  if (tourIndex === -1) {
    return res.status(404).json(notFoundRes);
  }

  const updatedTours = tours.filter((tour) => tour.id !== tourId);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};

app.route(apiUrl).get(getAllTours).post(createTour);
app
  .route(`${apiUrl}/:id`)
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
