const mongoose = require("mongoose");
var questionsSchema = require('./question');
const Schema = mongoose.Schema;

//Define schema that maps to a document in the Users collection in the appdb
//database.
const surveySchema = new Schema({
    surveyID: String, //unique identifier for user
    surveyTitle: String,
    surveyDate: String,
    courseID: String, //Name to be displayed within app
    questions: [questionsSchema]
  });

  const Survey = mongoose.model("Survey",surveySchema);

  module.exports = Survey;  