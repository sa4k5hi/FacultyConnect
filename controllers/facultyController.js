var scheduleCollection = require('../models/schedule');
var User = require('../models/userModels');
const {getDoubtsSlots} = require('../utils/facultyDoubtsSlotsMapping');

exports.getSlotsForGivenFaculty = async(req,res) => {
    var faculty = await User.findOne({email : req.body.email})
                            .select('registerationCode')
                            .exec();
    console.log(faculty.registerationCode);
    var data = await scheduleCollection.find({ name: faculty.registerationCode});
    var time_table = await getDoubtsSlots(data);
    res.render( 'faculty', { facultyCode : faculty.registerationCode, time_table: time_table} );
    console.log(data);
};