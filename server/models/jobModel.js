const mongoose = require('mongoose');
const validator = require('validator');

const jobSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  logo: {
    type: String,
    validate: [validator.isUrl, 'Enter a valid URL']
  },
  jobPostion: {
    type: String,
    required: [true, 'Job position is required']
  },
  monthlySalary: {
    type: Number
  },
  jobType: {
    type: String,
    enum: ['FullTime', 'Remote', '']
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
