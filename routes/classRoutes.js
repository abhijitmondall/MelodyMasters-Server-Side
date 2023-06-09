const classController = require('./../controllers/classController');

const express = require('express');
const router = express.Router();

router
  .route('/')
  .get(classController.getAllClasses)
  .post(classController.createClass);

router
  .route('/:id')
  .get(classController.getClass)
  .patch(classController.updateClass)
  .delete(classController.deleteClass);

module.exports = router;
