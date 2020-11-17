var express = require('express');
var router = express.Router();
var Response = require('../schemas/response');
var User = require('../schemas/user');
var Survey = require('../schemas/survey');

//READ user route: Retrieves the user with the specified userId from users collection (GET)
router.get('/responses/:userId', async(req, res, next) => {
    console.log("in /users route (GET) with userId = " + 
      JSON.stringify(req.params.userId));
    try {
      let thisUser = await User.findOne({id: req.params.userId});
      if (!thisUser) {
        return res.status(404).send("No user account with id " +
          req.params.userId + " was found in database.");
      } else {
        var courses = thisUser.courses;
        var questions = [];
        courses.forEach(course => {
            async function getQuestion(course){
                let thisQuestion = await Survey.find({courseID: course.courseID});
                // if(thisQuestion){
                    return thisQuestion;
                // }
            }
            
            let thisQuestion = getQuestion(course);
            if(thisQuestion){
                questions.push(thisQuestion);
            }
        });

        return res.status(200).json(JSON.stringify(questions));
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when all responses for the user with id " +
        req.params.userId + " in database: " + err);
    }
  });

module.exports = router;