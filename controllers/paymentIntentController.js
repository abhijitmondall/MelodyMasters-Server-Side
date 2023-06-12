const catchAsync = require('../utils/catchAsync');
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY);

exports.getPaymentIntent = catchAsync(async (req, res, next) => {
  const { price } = req.body;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    description: 'Software development services',
    shipping: {
      name: 'Anonymous',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.status(200).json({
    status: 'success',
    clientSecret: paymentIntent.client_secret,
  });
});
