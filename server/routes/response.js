var express = require('express');
var router = express.Router();
var Response = require('../schemas/response');
var User = require('../schemas/user');
var Survey = require('../schemas/survey');

//READ user route: Retrieves the user with the specified userId from users collection (GET)
router.get('/responses/:userId/:courses', async(req, res, next) => {
    console.log("in /users route (GET) with userId = " + 
      JSON.stringify(req.params.userId) + "  and courses=" + JSON.stringify(req.params.courses));

    try{
        let thisSurvey = await Survey.find({courseID: { $in: req.params.courses }});

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

  //CREATE reponse route: Adds a new response to the response collection (POST)
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




module.exports = router;