const mongoose = require("mongoose");
var responseSchema = require('./response');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    questionID: {type: String, required: true},
    questionTitle: {type: String, required: true},
    questionText: {type: String, required: true},
    questionType: {type: String, required: true},
    questionAnswers: [String],
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