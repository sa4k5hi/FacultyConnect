var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var scheduleSchema = new Schema(
    {
        day: {
            type: String,
            required:true,
            unique: true
        },

        availableSlots: {
            type: Schema.Types.Mixed,
        }
    }
);

module.exports = mongoose.model('scheduleCollection',scheduleSchema,'A1');