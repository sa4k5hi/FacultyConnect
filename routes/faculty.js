var express = require('express');
var router = express.Router();
var faculty_controller = require('../controllers/facultyController');
const { auth } = require('../controllers/authController');

router.get('/', auth, faculty_controller.getSlotsForGivenFaculty);
router.post('/slot/add', auth,faculty_controller.addSlot);
router.post('/slot/remove',auth,faculty_controller.deleteSlot)

module.exports = router;
