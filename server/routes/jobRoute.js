const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').post(authController.protect, jobController.addJob);
router.route('/:id').put(authController.protect, jobController.editJob);

module.exports = router;
