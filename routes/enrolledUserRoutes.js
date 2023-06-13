const express = require('express');
const enrolledUserController = require('./../controllers/enrolledUserController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(enrolledUserController.getAllEnrolledUsers)
  .post(authController.protected, enrolledUserController.createEnrolledUser);

router
  .route('/:id')
  .get(authController.protected, enrolledUserController.getEnrolledUser)
  .patch(
    authController.protected,
    authController.restrictTo('admin'),
    enrolledUserController.updateEnrolledUser
  )
  .delete(
    authController.protected,
    authController.restrictTo('admin'),
    enrolledUserController.deleteEnrolledUser
  );

module.exports = router;
