var scheduleCollection = require('../models/schedule');

exports.runn = async (req,res) => {
    const data = await scheduleCollection.find({});
    console.log(data);
    res.render( 'student', { enrollno: req.query.enrollno, time_table: data} );
};

