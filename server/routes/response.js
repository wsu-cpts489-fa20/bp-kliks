var express = require('express');
var router = express.Router();
var Response = require('../schemas/response');
var User = require('../schemas/user');
var Survey = require('../schemas/survey');

//READ user route: Retrieves the user with the specified userId from users collection (GET)
router.get('/responses/:userId/:courses', async(req, res, next) => {
    console.log("in /users route (GET) with userId = " + 
      JSON.stringify(req.params.userId) + "  and courses=" + JSON.stringify(req.params.courses));
    var courses = JSON.parse(req.params.courses);
    console.log(req.params.courses);
    try{
        let thisSurvey = await Survey.find({courseID: { $in: courses }});

        if(thisSurvey){
            console.log(thisSurvey);
            return res.status(200).json(JSON.stringify(thisSurvey));
        }

    }catch(err){
        console.log()
        return res.status(400).send("Unexpected error occurred when getting all responses for the user with id " +
          req.params.userId + " in database: " + err);
    }
  });

  //CREATE response route: Adds a new response to the response collection (POST)
  router.post('/responses/',  async (req, res, next) => {
    console.log("in /users route (POST) with params = " + JSON.stringify(req.params) +
      " and body = " + JSON.stringify(req.body));  
    if (req.body === undefined ||
        !req.body.hasOwnProperty("response") || 
        !req.body.hasOwnProperty("questionID") ||
        !req.body.hasOwnProperty("courseID") ||
        !req.body.hasOwnProperty("surveyID")) {
      //Body does not contain correct properties
      return res.status(400).send("/users POST request formulated incorrectly. " + 
        "It must contain 'response','questionID','courseID',and 'surveyID' fields in message body.")
    }
    try {
      let thisSurvey = await Survey.findOne({surveyID: req.body.surveyID, courseID: req.body.courseID, 
        questions : { $elemMatch : { questionID: req.body.questionID }}
    });

      if(!thisSurvey){
        res.status(404).send("No survey with the id: " + req.body.surveyID + " and courseID: "+ req.body.courseID + " " + " and questionID: "+ req.body.questionID + " " + "'.");
      }else{
          console.log(thisSurvey);
          try{
                console.log("RESPONSE IN BODY IS:");
                console.log(req.body.response);

                console.log("FOUND one");
                console.log(thisSurvey);
            var questions = thisSurvey.questions;
            questions.forEach((question) => {
                if(question.questionID == req.body.questionID){
                    question.responses.push(req.body.response);
                }
            });

            console.log(thisSurvey);
            console.log(thisSurvey.questions[0].responses);

            let pushResponse = thisSurvey.save();

              if (!pushResponse) {
                res.status(400).send("Unexpected error occurred when updating responses in database. Response was not added.");
              }
              else{
                res.status(200).send("Response successfully added in database.");
              }
          }catch(err){
            return res.status(400).send("Unexpected error occurred when adding response in database. " + err);
          }
      }

    } catch (err) {
      return res.status(400).send("Unexpected error occurred when adding or looking up survey in database. " + err);
    }
  });

//DELETE response route: Deletes the document with the specified responseId, courseID, surveyID, and questionID from Survey collection (DELETE)
router.delete('/responses/',  async (req, res, next) => {
    console.log("in /responses/ route (DELETE) with params = " + JSON.stringify(req.params) +
        " and body = " + JSON.stringify(req.body));  
    if (req.body === undefined ||
        !req.body.hasOwnProperty("responseId") || 
        !req.body.hasOwnProperty("questionID") ||
        !req.body.hasOwnProperty("courseID") ||
        !req.body.hasOwnProperty("surveyID")) {
        //Body does not contain correct properties
        return res.status(400).send("/responses.\/ DELETE request formulated incorrectly. " + 
        "It must contain 'responseId','questionID','courseID',and 'surveyID' fields in message body.")
    }
    try {
        let thisSurvey = await Survey.findOne({surveyID: req.body.surveyID, courseID: req.body.courseID, 
              questions : { $elemMatch : { questionID: req.body.questionID, responses : {
                  $elemMatch : {
                      responseId : req.body.responseId
                  }
              } }}
          });

        if(!thisSurvey){
        res.status(404).send("No survey with the id: " + req.body.surveyID + " and courseID: "+ req.body.courseID + " " + " and questionID: "+ req.body.questionID + " " + "'.");
        }else{
            thisSurvey.questions.forEach((question) => {
                if(question.questionID == req.body.questionID){
                    var removalIndex = question.responses.findIndex((response) => {
                        return response.responseId == req.body.responseId;
                    });

                    question.responses.splice(removalIndex, 1);
                }
            })

            var results = thisSurvey.save();

            if(!results){
                return res.status(400).send("Unexpected error occurred when saving after deleting a response. " + err);
            }else{
                console.log("Successfully deleted the Response");
                return res.status(200).send("Response successfully deleted in database.");
            }

        }

    } catch (err) {
        return res.status(400).send("Unexpected error occurred when deleting/updating a responses in database. " + err);
    }
});

//DELETE ALL response route: Deletes ALL documents with the specified courseID, surveyID, and questionID from Survey collection (DELETE)
router.delete('/responses/all',  async (req, res, next) => {
    console.log("in /responses/ route (DELETE) with params = " + JSON.stringify(req.params) +
        " and body = " + JSON.stringify(req.body));  
    if (req.body === undefined ||
        !req.body.hasOwnProperty("questionID") ||
        !req.body.hasOwnProperty("courseID") ||
        !req.body.hasOwnProperty("surveyID")) {
        //Body does not contain correct properties
        return res.status(400).send("/responses/all.\/ DELETE request formulated incorrectly. " + 
        "It must contain 'questionID','courseID',and 'surveyID' fields in message body.")
    }
    try {
        let thisSurvey = await Survey.findOne({surveyID: req.body.surveyID, courseID: req.body.courseID, 
              questions : { $elemMatch : { questionID: req.body.questionID }}
          });

        if(!thisSurvey){
        res.status(404).send("No survey with the id: " + req.body.surveyID + " and courseID: "+ req.body.courseID + " " + " and questionID: "+ req.body.questionID + " " + "'.");
        }else{
            thisSurvey.questions.forEach((question) => {
                if(question.questionID == req.body.questionID){
                    question.responses = [];
                }
            })

            var results = thisSurvey.save();

            if(!results){
                return res.status(400).send("Unexpected error occurred when saving after deleting ALL responses. " + err);
            }else{
                console.log("Successfully deleted ALL Responses from database");
                return res.status(200).send("Responses successfully deleted in database.");
            }

        }

    } catch (err) {
        return res.status(400).send("Unexpected error occurred when deleting ALL responses in database. " + err);
    }
});

module.exports = router;