const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    regNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^STU-\d{3}$/, 'Registration number must follow the format STU-001']
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      enum: {
        values: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'],
        message: '{VALUE} is not valid. Use JSS1, JSS2, JSS3, SS1, SS2, or SS3'
      }
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not valid. Use Male or Female'
      }
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    stateOfOrigin: {
      type: String,
      required: [true, 'State of origin is required'],
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Graduated', 'Suspended'],
        message: '{VALUE} is not valid. Use Active, Graduated, or Suspended'
      },
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
