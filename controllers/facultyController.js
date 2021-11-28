var scheduleCollection = require('../models/schedule');
var User = require('../models/userModels');
const {getDoubtsSlots} = require('../utils/facultyDoubtsSlotsMapping');

exports.getSlotsForGivenFaculty = async(req,res) => {
    console.log(req.id);
    var faculty = await User.findOne({_id : req.id});
    console.log(faculty);
    var data = await scheduleCollection.find({ name: faculty.registerationCode});
    var time_table = await getDoubtsSlots(data);
    res.render( 'faculty', { name: faculty.name , email: faculty.email, time_table: time_table} );
};

exports.addSlot = async (req,res) => {
    let newSlot = req.body;
    if (!newSlot.day || !newSlot.slot_details) {
        return res.status(400).send({ message: 'need required info' })
    }
    // console.log(newSlot.name + " " + newSlot.day + " " + newSlot.slot_details);

    var faculty = await User.findOne({_id : req.id});

    try {
        var filter = { name: faculty.registerationCode, day: newSlot.day };
        var update = {
            $push: { availableSlots: newSlot.slot_details }
        };
        var options = {
            new: true,
            upsert: true
        }
        const slot = await scheduleCollection.findOneAndUpdate(filter, update, options);
        res.redirect('/faculty');

    } catch(e) {
        console.log(e);
        return res.status(500).end()
    }
};

exports.deleteSlot = async(req,res) => {
    let delSlot = req.body;
    if (!delSlot.day || !delSlot.slot_details) {
        return res.status(400).send({ message: 'need required info' })
    }

    // console.log(delSlot.name + " " + delSlot.day + " " + delSlot.slot_details);
    try {

        var faculty = await User.findOne({_id : req.id});

        const resp = await scheduleCollection.updateOne({
            name: faculty.registerationCode,
            day: delSlot.day,
        },
        {
            $pullAll: {availableSlots : [delSlot.slot_details]},
        });
        res.redirect('/faculty');

    } catch(e) {
        return res.status(500).end()
    }
}