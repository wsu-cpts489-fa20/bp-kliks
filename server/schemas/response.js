const mongoose = require("mongoose");
var studentSchema = require('./student.js');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    students: [studentSchema],
    responseId: {type: String, required: true},
    responseDateTime: {type: String, required: true},
    surveyResponse: {type: String, required: true}
  },
  {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
    }
  });

  module.exports = responseSchema;