var express = require('express');
var router = express.Router();
const User = require('./../schemas/user');

//////////////////////////////////////
///////////Question Routes
//////////////////////////////////////


//CREATE question: Adds a new question

router.post('/questions/:userId', async (req,res,next) => {
    console.log
    console.log("in /questions (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
     if (!req.body.hasOwnProperty("questionID") || 
        !req.body.hasOwnProperty("questionTitle") || 
        !req.body.hasOwnProperty("questionText") ||
        !req.body.hasOwnProperty("questionType") ||
        !req.body.hasOwnProperty("questionAnswers") || 
        !req.body.hasOwnProperty("questionActive"))
        {
            return res.statusMessage(400).sent("POST request on /questions formulated incorrectly." +
            "Body must contain all 6 required fields, questionID, quiestionTitle, questionText, questionType, questionAnswers, questionActive");
        }
        try {
            let status = await User.updateOne(
            {id: req.params.userId},
            {$push: {questions: req.body}});
            if (status.nModified != 1) { //Should never happen!
              res.status(400).send("Unexpected error occurred when adding round to"+
                " database. Course was not added.");
            } else {
              res.status(200).send("Question successfully added to database.");
            }
          } catch (err) {
            console.log(err);
            return res.status(400).send("Unexpected error occurred when adding the question question" +
             " to database: " + err);
          } 
});

//READ question route: Returns all associated
//with a question the user created
router.get('/questions/:userId', async(req, res) => {
    console.log("in /questions route (GET) with userId = " + 
      JSON.stringify(req.params.userId));
    try {
      let thisUser = await User.findOne({id: req.params.userId});
      if (!thisUser) {
        return res.status(400).message("No user account with specified userId was found in database.");
      } else {
        return res.status(200).json(JSON.stringify(thisUser.questions));
      }
    } catch (err) {
      console.log()
      return res.status(400).message("Unexpected error occurred when looking up user in database: " + err);
    }
  });

  //UPDATE course route: Updates a specific course 
  //for a given user in the users collection (PUT)
  router.put('/questions/:userID/:questionId', async (req, res, next) => {
    console.log("in /questions (PUT) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    const validProps = ['questionID', 'questionTitle','questionText', 'questionType', 'questionAnswers', 'questionActive'];
    let bodyObj = {...req.body};
    delete bodyObj._id; //Not needed for update
    delete bodyObj.SGS; //We'll compute this below in seconds.
    for (const bodyProp in bodyObj) {
      if (!validProps.includes(bodyProp)) {
        return res.status(400).send("questions/ PUT request formulated incorrectly." +
          "It includes " + bodyProp + ". However, only the following props are allowed: " +
          "'questionID', 'questionTitle','questionText', 'questionType', 'questionAnswers', 'questionActive'");
      } else {
        bodyObj["questions.$." + bodyProp] = bodyObj[bodyProp];
        delete bodyObj[bodyProp];
      }
    }
    try {
      let status = await User.updateOne(
        {"id": req.params.userId,
         "questions._id": mongoose.Types.ObjectId(req.params.questionId)}
        ,{"$set" : bodyObj}
      );
      if (status.nModified != 1) {
        res.status(400).send("Unexpected error occurred when updating round in database. Round was not updated.");
      } else {
        res.status(200).send("Question successfully updated in database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Unexpected error occurred when updating question in database: " + err);
    } 
  });

  //DELETE question route: Deletes a specific course 
  //for a given user in the users collection (DELETE)
  router.delete('/questions/:userId/:questionId', async (req, res, next) => {
    console.log("in /questions (DELETE) route with params = " + 
                JSON.stringify(req.params)); 
    try {
      let status = await User.updateOne(
        {id: req.params.userId},
        {$pull: {questions: {_id: mongoose.Types.ObjectId(req.params.questionId)}}});
      if (status.nModified != 1) { //Should never happen!
        res.status(400).send("Unexpected error occurred when deleting round from database. Question was not deleted.");
      } else {
        res.status(200).send("Question successfully deleted from database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Unexpected error occurred when deleting question from database: " + err);
    } 
  });




module.exports = router;

