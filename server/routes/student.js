var express = require('express');
var router = express.Router();
const User = require('./../schemas/user');
const Course = require('./../schemas/course');
const Student = require('./../schemas/student');

/////////////////////////////////
//STUDENT ROUTES
////////////////////////////////

//CREATE student route: Adds a student to a course in the users collection (POST)
router.post('/students/:courseId', async (req, res, next) => {
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


//READ course route: Returns all students associated 
//with a given course in the users collection (GET)
router.get('/students/:courseId', async(req, res) => {
  console.log("in /students route (GET) with courseId = " + 
                JSON.stringify(req.params.course));
  try {
    let thisUser = await User.findOne({"courses.courseID": req.params.courseId});
    if (!thisUser) {
      return res.status(400).message("No user account with specified userId was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisUser.courses[0].students));
    }
  } catch (err) {
    console.log()
    return res.status(400).message("Unexpected error occurred when looking up user in database: " + err);
  }
});

//UPDATE student route: Updates a specific student 
//for a given course in the users collection (PUT)
router.put('/students/:courseId/:userId', async (req, res, next) => {
    console.log("in /courses (PUT) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("userID") ||
        !req.body.hasOwnProperty("studentDisplayName")) {
        //Body does not contain correct properties
        return res.status(400).send("PUT request on /student formulated incorrectly." +
        "Body must contain all 2 required fields: userID and studentDisplayName");
    }
    try {
      let status = await User.updateMany(
        {"courses.courseID": req.params.courseId,
          'courses.0.students': {"userID" : req.params.userId}},
        {$set: { 'courses.0.students' : req.body}},
        function (val){
            console.log(val);
        }
      );
      if (status.nModified != 1) {
        res.status(400).send("Unexpected error occurred when updating student in database. Student was not updated.");
      } else {
        res.status(200).send("Student successfully updated in database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Unexpected error occurred when updating student in database: " + err);
    } 
  });

//DELETE student route: Deletes a specific student
//from a course in the users collection (DELETE)
router.delete('/students/:courseId/:userId', async (req, res, next) => {
  console.log("in /rounds (DELETE) route with params = " + 
                JSON.stringify(req.params)); 
  try {
    let status = await User.updateMany(
      {"courses.courseID": req.params.courseId},
      {$pull: {'courses.0.students': {"userID" : req.params.userId}}});
      if (status.nModified != 1) { //Should never happen!
        res.status(400).send("Unexpected error occurred when deleting student from a course from database. Student was not deleted.");
      } else {
        res.status(200).send("Student successfully deleted from a course from database.");
      }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when deleting student from a course from database: " + err);
  } 
});

module.exports = router;