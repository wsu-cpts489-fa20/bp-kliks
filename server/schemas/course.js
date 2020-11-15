const mongoose = require("mongoose");
var studentSchema = require('./student');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseID: {type: String, required: true},
    courseInstructorFirstName: {type: String, required: true},
    courseInstructorLastName: {type: String, required: true},
    courseInstructorID: {type: String, required: true},
    courseName: {type: String, required: true},
    courseNumber: {type: String, required: true},
    courseYear: {type: String, required: true},
    courseSemester: {type: String, required: true, enum: ['Fall', 'Winter', 'Spring', 'Summer']},
    courseEnrollmentLimit: {type: Number, required: true, min: 1, max: 300},
    courseCurrentlyEnrolled: {type: Number, required: true, min: 1, max: 300},
    courseNotes: {type: String, required: true},
    students: [studentSchema],
  },
  {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
    }
  });

  module.exports = courseSchema;