const { default: ObjectID } = require('bson-objectid');
var express = require('express');
var router = express.Router();
var Survey = require('./../schemas/survey');

//////////////////////////////////////
///////////question Routes
//////////////////////////////////////


//CREATE question route: Adds a new question to the collection (POST)
router.post('/questions/:surveyID',  async (req, res, next) => {
  console.log("in /questions route (POST) with params = " + JSON.stringify(req.params) +
    " and body = " + JSON.stringify(req.body));  
    if (!req.body.hasOwnProperty("questionID") || 
    !req.body.hasOwnProperty("questionID") || 
    !req.body.hasOwnProperty("questionTitle") || 
    !req.body.hasOwnProperty("questionText") ||
    !req.body.hasOwnProperty("questionType") ||
    !req.body.hasOwnProperty("date") ||
    !req.body.hasOwnProperty("questionAnswers") || 
    !req.body.hasOwnProperty("acceptableAnswerTypes") ||
    !req.body.hasOwnProperty("questionActive"))
    {
        return res.status(400).sent("POST request on /questions formulated incorrectly." +
        "Body must contain all 6 required fields, questionID, quiestionTitle, questionText, questionType, acceptableAnswerTypes, questionAnswers, questionActive");
    }
  try {
      req.body["_id"] = ObjectID();
      req.body.questionID = req.body._id.str;
      thisSurvey = await Survey.updateOne(
        {surveyID: req.params.surveyID},
        {$push: {questions: req.body}});

        if (thisSurvey.nModified != 1) { //Should never happen!
          res.status(400).send("Unexpected error occurred when adding question to"+
            " database. question was not added.");
        } else {
          return res.status(200).send("New Question for '" + 
          req.params.surveyID + "' successfully created.");
        }
    
  } catch (err) {
    return res.status(400).send("Unexpected error occurred when adding or looking up Survey in database. " + err);
  }
});

//UPDATE questions route: Updates a specific course 
//for a given survey in the surveys collection (PUT)
router.put('/questions/:surveyID/:questionID', async (req, res, next) => {
  console.log("in /questions (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  // Make sure only these props are being added to the database for question
  const validProps = ['questionID', 'questionTitle','questionText', 'questionType','acceptableAnswerTypes', 'questionAnswers', 'questionActive'];
  let bodyObj = {...req.body};
  delete bodyObj._id; //Not needed for update
  for (const bodyProp in bodyObj) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("questions/ PUT request formulated incorrectly." +
        "It includes " + bodyProp + ". However, only the following props are allowed: " +
        "'questionID', 'questionTitle','questionText', 'questionType', 'acceptableAnswerTypes', 'questionAnswers', 'questionActive'");
    } else {
      bodyObj["questions.$." + bodyProp] = bodyObj[bodyProp];
      delete bodyObj[bodyProp];
    }
  }
  try {
    let status = await Survey.updateOne(
      {"surveyID": req.params.surveyID,
       "questions._id": mongoose.Types.Object(req.params.questionID)}
      ,{"$set" : bodyObj}
    );
    if (status.nModified != 1) {
      res.status(400).send("Unexpected error occurred when updating question in database. Question was not updated.");
    } else {
      res.status(200).send("Question successfully updated in database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when updating question in database: " + err);
  } 
});


//DELETE question in database
router.delete('/questions/:surveyId/:questionId', async (req, res, next) => {
  console.log("in /questions (DELETE) route with params = " + 
              JSON.stringify(req.params)); 
  try {
    let status = await Survey.updateOne(
      {surveyID: req.params.surveyID},
      {$pull: {questions: {_id: mongoose.Types.ObjectId(req.params.questionID)}}});
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when deleting question from database. question was not deleted.");
    } else {
      res.status(200).send("Question successfully deleted from database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when deleting question from database: " + err);
  } 
});


//GET question from database
router.get('/questions/:surveyId', async(req, res) => {
  console.log("in /questions route (GET) with surveyId = " + 
    JSON.stringify(req.params.surveyID));
  try {
    let thisSurvey = await Survey.findOne({id: req.params.surveyID});
    if (!thisSurvey) {
      return res.status(400).message("No survey with specified surveyId was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisSurvey.questions));
    }
  } catch (err) {
    console.log(err);
    return res.status(400).message("Unexpected error occurred when looking up question in database: " + err);
  }
});

module.exports = router;

