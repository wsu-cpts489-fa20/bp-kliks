const mongoose = require("mongoose");
var courseSchema = require('./course.js');
const Schema = mongoose.Schema;

//Define schema that maps to a document in the Users collection in the appdb
//database.
const userSchema = new Schema({
    id: String, //unique identifier for user
    userType: String,
    password: String,
    displayName: String, //Name to be displayed within app
    authStrategy: String, //strategy used to authenticate, e.g., github, local
    profilePicURL: String, //link to profile image
    securityQuestion: String,
    securityAnswer: {type: String, required: function() 
      {return this.securityQuestion ? true: false}},
    courses: [courseSchema]
  });

  const User = mongoose.model("User",userSchema);
  module.exports = User;