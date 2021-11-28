var scheduleCollection = require('../models/schedule');

const {getDoubtsSlots} = require('../utils/facultyDoubtsSlotsMapping');

var User = require('../models/userModels');

exports.allFacultiesDoubtsSlots = async (req,res) => {
    var user = await User.findOne({_id : req.id});

    const data = await scheduleCollection.find({});
    var time_table = await getDoubtsSlots(data);
    res.render( 'student', { name: user.name , email: user.email, time_table: time_table} );
};