const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { tourId } = req.params;
  const { _id: userId, email } = req.user;
  const tour = await Tour.findById(tourId);
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${baseUrl}/?tour=${tourId}&user=${userId}&price=${tour.price}`,
    cancel_url: `${baseUrl}/tour/${tour.slug}`,
    customer_email: email,
    client_reference_id: tourId,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://natours.dev/img/tours/${tour.imageCover}`],
          },
        },
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;

  if (!tour || !user || !price) {
    return next();
  }

  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});
