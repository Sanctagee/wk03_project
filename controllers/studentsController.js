const mongoose = require('mongoose');
const Student = require('../models/student');

// fetch all students, sorted by last name
const getAll = async (req, res) => {
  try {
    const allStudents = await Student.find().sort({ lastName: 1 });
    res.status(200).json({ count: allStudents.length, students: allStudents });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong fetching students', details: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'That is not a valid student ID' });
    }
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve student', details: err.message });
  }
};

const createStudent = async (req, res) => {
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Student data',
      required: true,
      schema: { $ref: '#/definitions/Student' }
    }
  */
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({
      message: 'Student added successfully',
      id: newStudent._id,
      regNumber: newStudent.regNumber,
      name: `${newStudent.firstName} ${newStudent.lastName}`
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation error', details: messages });
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ error: `Duplicate value — a student with that ${field} already exists` });
    }
    res.status(500).json({ error: 'Could not save student', details: err.message });
  }
};

const updateStudent = async (req, res) => {
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Fields to update',
      required: true,
      schema: { $ref: '#/definitions/Student' }
    }
  */
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'That is not a valid student ID' });
    }
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'No student found with that ID' });
    res.status(204).send();
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation error', details: messages });
    }
    res.status(500).json({ error: 'Update failed', details: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'That is not a valid student ID' });
    }
    const removed = await Student.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'No student found with that ID' });
    res.status(200).json({ message: 'Student removed from the system' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete student', details: err.message });
  }
};

module.exports = { getAll, getSingle, createStudent, updateStudent, deleteStudent };