var express = require('express');
var router = express.Router();
const User = require('./../schemas/user');
const Course = require('./../schemas/course');
const Student = require('./../schemas/student');

/////////////////////////////////
//STUDENT ROUTES
////////////////////////////////

//CREATE student route: Adds a student to a course in the users collection (POST)
router.post('/student/:userId/:courseId', async (req, res, next) => {
    console.log("in /student (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("userId") ||
        !req.body.hasOwnProperty("studentDisplayName")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /student formulated incorrectly." +
        "Body must contain all 2 required fields: userID and studentDisplayName");
    }
    try {
        // need to find the course with the proper id to update
      let status = await User.updateOne(
      {id: req.params.userId, "courses.courseID": req.params.courseId},
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