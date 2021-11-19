var express = require('express');
var router = express.Router();
var schedule_controller = require('../controllers/scheduleController');

router.get('/',schedule_controller.allFacultiesDoubtsSlots);

module.exports = router;