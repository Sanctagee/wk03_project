const router = require('express').Router();
const {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/coursesController');

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;