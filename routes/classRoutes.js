const express = require('express');
const router = express.Router();
const classController = require('./../controllers/classController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(classController.getAllClasses)
  .post(
    authController.protected,
    authController.restrictTo('Instructor', 'Admin'),
    classController.createClass
  );

router
  .route('/:id')
  .get(classController.getClass)
  .patch(authController.protected, classController.updateClass)
  .delete(
    authController.protected,
    authController.restrictTo('Instructor', 'Admin'),
    classController.deleteClass
  );

module.exports = router;
