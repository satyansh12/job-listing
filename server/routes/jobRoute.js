const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, jobController.getJobs)
  .post(authController.protect, jobController.addJob);

router
  .route('/:id')
  .get(authController.protect, jobController.getJob)
  .put(authController.protect, jobController.editJob);

module.exports = router;
