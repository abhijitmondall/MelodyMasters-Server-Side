const classController = require('./../controllers/classController');
const authController = require('./../controllers/authController');

const express = require('express');
const router = express.Router();

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
  .patch(
    authController.protected,
    authController.restrictTo('Instructor', 'Admin'),
    classController.updateClass
  )
  .delete(
    authController.protected,
    authController.restrictTo('Instructor', 'Admin'),
    classController.deleteClass
  );

module.exports = router;
