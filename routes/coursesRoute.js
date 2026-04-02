const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const isAuthenticated = require('../middleware/isAuthenticated');

// GET all courses — public
router.get('/', coursesController.getAll);

// GET single course — public
router.get('/:id', coursesController.getSingle);

// POST new course — requires login
router.post('/', isAuthenticated, coursesController.createCourse);

// PUT update course — requires login
router.put('/:id', isAuthenticated, coursesController.updateCourse);

// DELETE course — requires login
router.delete('/:id', isAuthenticated, coursesController.deleteCourse);

module.exports = router;