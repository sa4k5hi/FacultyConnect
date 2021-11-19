var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var scheduleSchema = new Schema(
    {
        name: {
            type: String
        },

        day: {
            type: String,
        },

        availableSlots: {
            type: [String],
        }
    }
);

module.exports = mongoose.model('scheduleCollection',scheduleSchema,'A1');