var express = require('express');
var ObjectID = require("bson-objectid"); // Source: https://www.npmjs.com/package/bson-objectid
const courseSchema = require('../schemas/course');
var router = express.Router();
const User = require('./../schemas/user');


/////////////////////////////////
//COURSES ROUTES
////////////////////////////////

//CREATE course route: Adds a new course as a subdocument to 
//a document in the users collection (POST)
router.post('/courses/:userId', async (req, res, next) => {
  console.log("in /courses (POST) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  // Specify what the body for the course is needed for the data collection     
  if (!req.body.hasOwnProperty("courseInstructorFirstName") || 
      !req.body.hasOwnProperty("courseInstructorLastName") || 
      !req.body.hasOwnProperty("courseInstructorID") ||
      !req.body.hasOwnProperty("courseName") ||
      !req.body.hasOwnProperty("courseNumber") || 
      !req.body.hasOwnProperty("courseYear") ||
      !req.body.hasOwnProperty("courseSemester") ||
      !req.body.hasOwnProperty("courseEnrollmentLimit") || 
      !req.body.hasOwnProperty("courseCurrentlyEnrolled") || 
      !req.body.hasOwnProperty("courseID") ||
      !req.body.hasOwnProperty("courseNotes")) {
    //Body does not contain correct properties
    return res.status(400).send("POST request on /courses formulated incorrectly." +
      "Body must contain all 11 required fields: courseInstructorFirstName, courseInstructorLastName, courseInstructorID, courseName, courseNumber, courseYear, courseSemester, courseEnrollmentLimit, courseCurrentlyEnrolled, , courseID, courseNotes");
  }
  try {
    req.body["_id"] = ObjectID();
    req.body.courseID = req.body._id.str;

    let status = await User.updateOne(
    {id: req.params.userId},
    {$push: {courses: req.body}});
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when adding course to"+
        " database. Course was not added.");
    } else {
      res.status(200).send("Course successfully added to database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when adding course" +
     " to database: " + err);
  } 
});

//READ course route: Returns all courses associated 
//with a given user in the users collection (GET)
router.get('/courses/:userId', async(req, res) => {
  console.log("in /courses route (GET) with userId = " + 
    JSON.stringify(req.params.userId));
  try {
    let thisUser = await User.findOne({id: req.params.userId});
    if (!thisUser) {
      return res.status(400).message("No user account with specified userId was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisUser.courses));
    }
  } catch (err) {
    console.log(err);
    return res.status(400).message("Unexpected error occurred when looking up user in database: " + err);
  }
});

//UPDATE course route: Updates a specific course 
//for a given user in the users collection (PUT)
router.put('/courses/:userId/:courseId', async (req, res, next) => {
  console.log("in /courses (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  // Make sure only these props are being added to the database for user
  const validProps = ['courseInstructorFirstName', 'courseInstructorLastName','courseInstructorID', 'courseName', 'courseNumber', 'courseYear',
    'courseSemester', 'courseEnrollmentLimit', 'courseCurrentlyEnrolled', 'courseID', 'courseNotes'];
  let bodyObj = {...req.body};
  delete bodyObj._id; //Not needed for update
  for (const bodyProp in bodyObj) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("courses/ PUT request formulated incorrectly." +
        "It includes " + bodyProp + ". However, only the following props are allowed: " +
        "'courseInstructorFirstName', 'courseInstructorLastName', 'courseInstructorID', 'courseName', 'courseNumber', 'courseYear','courseSemester', 'courseEnrollmentLimit', 'courseCurrentlyEnrolled', 'courseID', 'courseNotes'");
    } else {
      bodyObj["courses.$." + bodyProp] = bodyObj[bodyProp];
      delete bodyObj[bodyProp];
    }
  }
  try {
    let status = await User.updateOne(
      {"id": req.params.userId,
       "courses.courseID": req.params.courseId}
      ,{"$set" : bodyObj}
    );
    if (status.nModified != 1) {
      res.status(400).send("Unexpected error occurred when updating course in database. Course was not updated.");
    } else {
      res.status(200).send("Course successfully updated in database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when updating course in database: " + err);
  } 
});

//DELETE course route: Deletes a specific course 
//for a given user in the users collection (DELETE)
router.delete('/courses/:userId/:courseId', async (req, res, next) => {
  console.log("in /courses (DELETE) route with params = " + 
              JSON.stringify(req.params)); 
  try {
    let status = await User.updateOne(
      {id: req.params.userId},
      {$pull: {courses: {courseID: req.params.courseId}}});
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when deleting course from database. Course was not deleted.");
    } else {
      res.status(200).send("Course successfully deleted from database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when deleting course from database: " + err);
  } 
});
  
  //READ course route: Returns all courses associated 
  //with a given user in the users collection (GET)
  router.get('/courses/:userId', async(req, res) => {
    console.log("in /courses route (GET) with userId = " + 
      JSON.stringify(req.params.userId));
    try {
      let thisUser = await User.findOne({id: req.params.userId});
      if (!thisUser) {
        return res.status(400).message("No user account with specified userId was found in database.");
      } else {
        return res.status(200).json(JSON.stringify(thisUser.courses));
      }
    } catch (err) {
      console.log(err);
      return res.status(400).message("Unexpected error occurred when looking up user in database: " + err);
    }
  });

  module.exports = router;