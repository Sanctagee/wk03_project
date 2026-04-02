const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const isAuthenticated = require('../middleware/isAuthenticated');

// GET all students — public
router.get('/', studentsController.getAll);

// GET single student — public
router.get('/:id', studentsController.getSingle);

// POST new student — requires login
router.post('/', isAuthenticated, studentsController.createStudent);

// PUT update student — requires login
router.put('/:id', isAuthenticated, studentsController.updateStudent);

// DELETE student — requires login
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;