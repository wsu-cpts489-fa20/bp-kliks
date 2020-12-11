const mongoose = require("mongoose");
var responseSchema = require('./response');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    questionID: {type: String, required: true},
    questionTitle: {type: String, required: true},
    questionText: {type: String, required: true},
    questionType: {type: String, required: true},
    date: {type: String, required: true},
    questionAnswers: [String],
    acceptableAnswerTypes: [String], /* Used for specifying the acceptable file types */
    questionActive: {type: Boolean, required: true},
    responses: [responseSchema]
  },
  {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
    }
  });

  module.exports = questionsSchema;