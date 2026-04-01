const mongoose = require('mongoose');
const Course = require('../models/course');

const getAll = async (req, res) => {
  try {
    const courses = await Course.find().sort({ courseCode: 1 });
    res.status(200).json({ total: courses.length, courses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load courses', details: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving course', details: err.message });
  }
};

const createCourse = async (req, res) => {
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Course data',
      required: true,
      schema: { $ref: '#/definitions/Course' }
    }
  */
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({
      message: 'Course created',
      id: course._id,
      courseCode: course.courseCode,
      name: course.courseName
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Check your input', details: msgs });
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ error: `That ${field} is already taken by another course` });
    }
    res.status(500).json({ error: 'Could not create course', details: err.message });
  }
};

const updateCourse = async (req, res) => {
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Fields to update',
      required: true,
      schema: { $ref: '#/definitions/Course' }
    }
  */
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(204).send();
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Check your input', details: msgs });
    }
    res.status(500).json({ error: 'Could not update course', details: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete course', details: err.message });
  }
};

module.exports = { getAll, getSingle, createCourse, updateCourse, deleteCourse };