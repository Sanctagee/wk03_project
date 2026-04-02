const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.use('/auth', require('./authRoute'));
router.use('/students', require('./studentsRoute'));
router.use('/courses', require('./coursesRoute'));

module.exports = router;