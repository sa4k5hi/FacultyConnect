var express = require('express');
var router = express.Router();
var faculty_controller = require('../controllers/facultyController');

router.post('/', faculty_controller.getSlotsForGivenFaculty);

module.exports = router;
