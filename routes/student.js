var express = require('express');
var router = express.Router();
var schedule_controller = require('../controllers/scheduleController');
const { auth } = require('../controllers/authController');

router.get('/',auth, schedule_controller.allFacultiesDoubtsSlots);

module.exports = router;