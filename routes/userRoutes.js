const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/jwt/:email').get(authController.jwt);
router.route('/top-6-instructors').get(userController.getTopSixInstructors);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authController.protected,
    authController.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authController.protected,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
