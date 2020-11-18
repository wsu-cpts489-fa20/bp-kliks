var express = require('express');
var router = express.Router();
const User = require('./../schemas/user');
const Course = require('./../schemas/course');
const Student = require('./../schemas/student');

/////////////////////////////////
//STUDENT ROUTES
////////////////////////////////

//CREATE student route: Adds a student to a course in the users collection (POST)
router.post('/student/:courseId', async (req, res, next) => {
    console.log("in /student (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("userID") ||
        !req.body.hasOwnProperty("studentDisplayName")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /student formulated incorrectly." +
        "Body must contain all 2 required fields: userID and studentDisplayName");
    }
    try {
      console.log(req.body.userID);
      let status = await User.updateMany(
      {"courses.courseID": req.params.courseId},
      {$push: {'courses.$.students': req.body}});
      if (status.nModified != 1) { //Should never happen!
        res.status(400).send("Unexpected error occurred when adding student to"+
          " database. Student was not added.");
      } else {
        res.status(200).send("Student successfully added to database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Unexpected error occurred when adding student" +
       " to database: " + err);
    } 
  });

module.exports = router;