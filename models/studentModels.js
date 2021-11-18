var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema(
    {
        Enrollment: {
            type: String,
            required: true,
            unique: true,
        },

        Name: {
            type: String,
            required: true
        },

        Branch: {
            type: String
        },

        Degree: {
            type: String
        },

        GradYear: {
            type: String
        }
    }
);

module.exports = mongoose.model('studentCollection',studentSchema,'students');