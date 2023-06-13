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
  .get(authController.protected, selectedClassController.getSelectedClass)
  .patch(authController.protected, selectedClassController.updateSelectedClass)
  .delete(
    authController.protected,
    selectedClassController.deleteSelectedClass
  );

module.exports = router;
