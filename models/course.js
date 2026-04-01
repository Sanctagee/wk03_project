const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z]{2,5}\d{3}$/, 'Course code must follow the format MTH101']
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      minlength: [3, 'Course name must be at least 3 characters']
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: {
        values: ['Sciences', 'Arts', 'Commerce', 'Languages', 'Social Sciences', 'General Studies'],
        message: '{VALUE} is not a valid department'
      }
    },
    gradeLevel: {
      type: String,
      required: [true, 'Grade level is required'],
      enum: {
        values: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3', 'All'],
        message: '{VALUE} is not a valid grade level'
      }
    },
    teacherName: {
      type: String,
      required: [true, 'Teacher name is required'],
      trim: true
    },
    daysPerWeek: {
      type: Number,
      required: [true, 'Days per week is required'],
      min: [1, 'Must run for at least 1 day per week'],
      max: [6, 'Cannot exceed 6 days per week']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters']
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);