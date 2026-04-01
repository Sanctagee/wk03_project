const router = require('express').Router();

router.use('/students', require('./studentsRoute'));
router.use('/courses', require('./coursesRoute'));

module.exports = router;