var scheduleCollection = require('../models/schedule');

const {getDoubtsSlots} = require('../utils/facultyDoubtsSlotsMapping');

var User = require('../models/userModels');

exports.allFacultiesDoubtsSlots = async (req,res) => {
    var user = await User.findOne({email : req.body.email})
                            .select('registerationCode')
                            .exec();
    const data = await scheduleCollection.find({});
    var time_table = await getDoubtsSlots(data);
    res.render( 'student', { enrollno: user.registerationCode, time_table: time_table} );
};

