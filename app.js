const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tourId = Number(req.params.id);
  const tourIndex = tours.findIndex((el) => el.id === tourId);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tours[tourIndex],
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tourId = Number(req.params.id);
  const tourIndex = tours.findIndex((el) => el.id === tourId);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  const updatedTour = { ...tours[tourId], ...req.body };
  const updatedTours = [...tours];
  updatedTours[tourId] = updatedTour;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const tourId = Number(req.params.id);
  const tourIndex = tours.findIndex((el) => el.id === tourId);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  const updatedTours = tours.filter((tour) => tour.id !== tourId);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
