const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    userID: {type: String, required: true},
    studentDisplayName: {type: String, required: true}
  },
  {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
    }
  });
  
  module.exports = studentSchema;