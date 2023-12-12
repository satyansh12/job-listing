const Job = require('../models/jobModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addJob = catchAsync(async (req, res, next) => {
  const {
    companyName,
    logo,
    jobPostion,
    monthlySalary,
    jobType,
    category,
    location,
    description,
    about,
    skills,
    information
  } = req.body;

  const job = await Job.create({
    companyName,
    logo,
    jobPostion,
    monthlySalary,
    jobType,
    category,
    location,
    description,
    about,
    skills,
    information,
    createdBy: req.user._id
  });

  res.status(200).json({
    status: 'success',
    data: { job }
  });
});

exports.editJob = catchAsync(async (req, res, next) => {
  // Check if job belongs to the user
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new AppError('Job not found'));
  }

  if (!job.createdBy === req.user.id) {
    return next(new AppError('You are not allowed to edit this job', 401));
  }

  //Update the job
  await Job.updateOne({ _id: id }, req.body);

  res.status(200).json({
    status: 'success',
    message: 'resource updated successfully'
  });
});
