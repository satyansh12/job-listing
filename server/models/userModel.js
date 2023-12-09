const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Email is invalid '],
    unique: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile is required'],
    validate: {
      validator: function(value) {
        return validator.isMobilePhone(value, 'en-IN');
      },
      message: 'Mobile is not valid'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.methods.validatePassword = async function(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
