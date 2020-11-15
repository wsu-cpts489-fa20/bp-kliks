var express = require('express');
var router = express.Router();
const auth = require('./auth');
const user = require('./user');
const course = require('./course');
const question = require('./question');
const response = require('./response');
const student = require('./student');
const survey = require('./survey');

router.use("", auth);
router.use("", user);
router.use("", course);
router.use("", question);
router.use("", response);
router.use("", student);
router.use("", survey);

module.exports = router;