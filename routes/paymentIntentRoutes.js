const express = require('express');
const authController = require('../controllers/authController');
const paymentIntentController = require('../controllers/paymentIntentController');
const router = express.Router();

router
  .route('/')
  .post(authController.protected, paymentIntentController.getPaymentIntent);

module.exports = router;
