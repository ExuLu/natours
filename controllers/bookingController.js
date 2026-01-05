const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${baseUrl}/`,
    cancel_url: `${baseUrl}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
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
