const router = require('express').Router();
const {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentsController');

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;