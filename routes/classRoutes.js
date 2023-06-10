const classController = require('./../controllers/classController');
const authController = require('./../controllers/authController');

const express = require('express');
const router = express.Router();

router
  .route('/')
  .get(classController.getAllClasses)
  .post(
    authController.protected,
    authController.restrictTo('instructor', 'admin'),
    classController.createClass
  );

router
  .route('/:id')
  .get(classController.getClass)
  .patch(
    authController.protected,
    authController.restrictTo('instructor', 'admin'),
    classController.updateClass
  )
  .delete(
    authController.protected,
    authController.restrictTo('instructor', 'admin'),
    classController.deleteClass
  );

module.exports = router;
