var express = require('express');
var router = express.Router();
const Survey = require('./../schemas/survey');

/////////////////////////////////
//Survey ACCOUNT MANAGEMENT ROUTES
////////////////////////////////


//READ Survey route: Retrieves the Survey with the specified surveyID from surveys collection (GET)
router.get('/surveys/:surveyId', async(req, res, next) => {
    console.log("in /surveys route (GET) with surveyID = " + 
      JSON.stringify(req.params.surveyID));
    try {
      let thisSurvey = await Survey.findOne({surveyID: req.params.surveyID});
      if (!thisSurvey) {
        return res.status(404).send("No surveys with id " +
          req.params.surveyID + " was found in database.");
      } else {
        return res.status(200).json(JSON.stringify(thisSurvey));
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when looking up Survey with id " +
        req.params.surveyID + " in database: " + err);
    }
  });
  
  //CREATE Survey route: Adds a new Survey account to the surveys collection (POST)
  router.post('/surveys/:surveyID',  async (req, res, next) => {
    console.log("in /surveys route (POST) with params = " + JSON.stringify(req.params) +
      " and body = " + JSON.stringify(req.body));  
    if (req.body === undefined ||
        !req.body.hasOwnProperty("surveyTitle") || 
        !req.body.hasOwnProperty("surveyDate") ||
        !req.body.hasOwnProperty("courseID")) {
      //Body does not contain correct properties
      return res.status(400).send("/surveys POST request formulated incorrectly. " + 
        "It must contain 'surveyTitle','surveyDate','courseID' in message body.")
    }
    try {
      let thisSurvey = await Survey.findOne({id: req.params.surveyID});
      if (thisSurvey) { //account already exists
        res.status(400).send("There is already a survey with this ID '" + 
          req.params.surveyID + "'.");
      } else { //account available -- add to database
        thisSurvey = await new Survey({
          surveyID: req.params.surveyID,
          surveyTitle: req.body.surveyTitle,
          surveyDate: req.body.surveyDate,
          courseID: req.body.courseID,
          questions: []
        }).save();
        return res.status(201).send("New survey for '" + 
          req.params.surveyID + "' successfully created.");
      }
    } catch (err) {
      return res.status(400).send("Unexpected error occurred when adding or looking up Survey in database. " + err);
    }
  });
  
  //UPDATE Survey route: Updates a new Survey account in the surveys collection (POST)
  router.put('/surveys/:surveyID',  async (req, res, next) => {
    console.log("in /surveys update route (PUT) with surveyID = " + JSON.stringify(req.params) + 
      " and body = " + JSON.stringify(req.body));
    if (!req.params.hasOwnProperty("surveyID"))  {
      return res.status(400).send("surveys/ PUT request formulated incorrectly." +
          "It must contain 'surveyID' as parameter.");
    }
    const validProps = ['surveyTitle','surveyDate','courseID'];
    for (const bodyProp in req.body) {
      if (!validProps.includes(bodyProp)) {
        return res.status(400).send("surveys/ PUT request formulated incorrectly." +
          "Only the following props are allowed in body: " +
          "'surveyTitle','surveyDate','courseID'");
      } 
    }
    try {
          let status = await Survey.updateOne({surveyID: req.params.surveyID}, 
            {$set: req.body});
          if (status.nModified != 1) { //account could not be found
            res.status(404).send("No Survey " + req.params.surveyID + " exists. Survey could not be updated.");
          } else {
            res.status(200).send("Survey " + req.params.surveyID + " successfully updated.")
          }
        } catch (err) {
          res.status(400).send("Unexpected error occurred when updating Survey data in database: " + err);
        }
  });
  
  //DELETE Survey route: Deletes the document with the specified surveyID from surveys collection (DELETE)
  router.delete('/surveys/:surveyID', async(req, res, next) => {
    console.log("in /surveys route (DELETE) with surveyID = " + 
      JSON.stringify(req.params.surveyID));
    try {
      let status = await Survey.deleteOne({surveyID: req.params.surveyID});
      if (status.deletedCount != 1) {
        return res.status(404).send("No Survey " +
          req.params.surveyID + " was found. Survey could not be deleted.");
      } else {
        return res.status(200).send("Survey " +
        req.params.surveyID + " was successfully deleted.");
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when attempting to delete Survey with id " +
        req.params.surveyID + ": " + err);
    }
  });
module.exports = router;