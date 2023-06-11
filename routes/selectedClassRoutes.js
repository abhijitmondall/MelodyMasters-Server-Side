const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');
const selectedClassController = require('./../controllers/selectedClassController');

router
  .route('/')
  .get(selectedClassController.getAllSelectedClasses)
  .post(authController.protected, selectedClassController.createSelectedClass);

router
  .route('/:id')
  .get(selectedClassController.getSelectedClass)
  .patch(
    authController.protected,
    authController.restrictTo('Instructor', 'Admin'),
    selectedClassController.updateSelectedClass
  )
  .delete(
    authController.protected,
    authController.restrictTo('Instructor', 'Admin'),
    selectedClassController.deleteSelectedClass
  );

module.exports = router;
