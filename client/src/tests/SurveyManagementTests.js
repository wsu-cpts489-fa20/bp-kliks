import { Selector } from 'testcafe';
import { accounts, isLocalTesting } from './config.js';

const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';

fixture `Questions/Survey Management Tests`
    .page(isLocalTesting ? DEV_TEST_URL : DEPLOY_TEST_URL);
/*
    BELOW ARE THE RESPONSE TABLE TESTS
*/

// Create Question
test('Create Question: Create a question -- Page Appears', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-create')
    .expect(Selector('#createQuestionMode').exists).eql(true)
});

test('Create Question: Create a question -- Free Response', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-create')
    .expect(Selector('#createQuestionMode').exists).eql(true)

    /*  Add Content  */
    .typeText('#createQuestion-title', "Title of Question")
    .typeText('#createQuestion-question', "This is a question")
    .typeText('#createQuestion-freeResponse', "Free response answer.")
    .click('#createQuestion-createQuestionBtn')

    .click('#menuBtn')
    .click('#surveyManagement-searchSurvey')
    .expect(Selector('#searchSurveyTableMode').exists).eql(true)
    // .expect(Selector('#searchSurveyTableBody').child(0).child(4).innerText).eql('5')
    // .expect(Selector('#searchQuestionsMode').exists).eql(true)
});

test('Create Question: Create a question -- Multiple Choice', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-create')
    .expect(Selector('#createQuestionMode').exists).eql(true)

    /*  Add Content  */
    .typeText('#createQuestion-title', "Title of Question")
    .typeText('#createQuestion-question', "This is a question")

    .click('#createQuestion-answerTypeDropdown')
    .click(Selector('option').filter('[value="multipleChoice"]'))
    .typeText(Selector('input').filter('[id="0-mcOption"]'), "MC Answer 0.")
    .click('#createQuestion-createQuestionBtn')
    .expect(Selector('#searchQuestionsMode').exists).eql(true)

    // .typeText('#createQuestion-freeResponse', "Free response answer.")

    // .click('#menuBtn')
    // .click('#surveyManagement-searchSurvey')
    // .expect(Selector('#searchSurveyTableBody').child(0).child(4).innerText).eql('5')

});

test('Create Question: Create a question -- File Upload Choice', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-create')
    .expect(Selector('#createQuestionMode').exists).eql(true)

    /*  Add Content  */
    .typeText('#createQuestion-title', "Title of Question")
    .typeText('#createQuestion-question', "This is a question")

    .click('#createQuestion-answerTypeDropdown')
    .click(Selector('option').filter('[value="fileUpload"]'))
    .click('#createQuestion-file-upload')

    .click('#createQuestion-createQuestionBtn')
    .expect(Selector('#searchQuestionsMode').exists).eql(true)
});

// Create Survey
test('Create Survey: Create a survey given we have a course', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-createSurvey')
    .expect(Selector('#createSurvey-page').exists).eql(true)

    /*  Add Content  */
    .typeText('#createSurvey-title', "Title of SURVEY")
    .click('#createSurvey-creatBtn')
    
    .expect(Selector('#searchSurveyTableMode').exists).eql(true)
});

// View Surveys
test('View Surveys: Surveys', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .click('#menuBtn')
    .click('#surveyManagement-searchSurvey')
    
    .expect(Selector('#searchSurveyTableMode').exists).eql(true)
    .expect(Selector('#searchSurveyTableBody').child().count).gte(5)
});

// /*
//     BELOW ARE THE RESPONSE TABLE TESTS
// */    
// test('Response Table: Test View Response Table', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)
// });

// test('Response Table: Test View Response', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#viewResponseModal').exists).eql(false)
//     .click("#testID-questionID1-responseID3-0-view")
//     .expect(Selector('#viewResponseModal').exists).eql(true)
// });


// test('Response Table: Test Cancel View Response', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#viewResponseModal').exists).eql(false)
//     .click("#testID-questionID1-responseID3-0-view")
//     .expect(Selector('#viewResponseModal').exists).eql(true)

//     .click("#viewResponseModal-closeBtn")
//     .expect(Selector('#viewResponseModal').exists).eql(false)
//     .expect(Selector('#responseTableBody').exists).eql(true)
// });


// test('Response Table: Test Search Responses', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#viewResponseModal').exists).eql(false)

//     .typeText('#searchResponses', 'Nov 22') //Search
//     .pressKey('Enter')

//     .click("#testID-questionID1-responseID3-0-view")
//     .expect(Selector('#viewResponseModal').exists).eql(true)

//     .click("#viewResponseModal-closeBtn")
//     .expect(Selector('#viewResponseModal').exists).eql(false)
//     .expect(Selector('#responseTableBody').exists).eql(true)
// });

// test('Test Sort by Question Responses', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#viewResponseModal').exists).eql(false)

//     .click("#responseSortResponse")

//     .expect(Selector('#responseTableBody').exists).eql(true)
// });

// test('Response Table: Test Sort by Question Type', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#viewResponseModal').exists).eql(false)

//     .click("#responseSortQuestionType")

//     .expect(Selector('#responseTableBody').exists).eql(true)
// });

// test('Response Table: Test Sort by Question', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#viewResponseModal').exists).eql(false)

//     .click("#responseSortQuestion")

//     .expect(Selector('#responseTableBody').exists).eql(true)
// });

// test('Response Table: Test Sort by Response Date-Time', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#viewResponseModal').exists).eql(false)

//     .click("#responseSortDate")

//     .expect(Selector('#responseTableBody').exists).eql(true)
// });

// test('Response Table: Test View Delete Response Modal', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#deleteResponseModal').exists).eql(false)
//     .click("#testID-questionID1-responseID3-0-delete")
//     .expect(Selector('#deleteResponseModal').exists).eql(true)
// });

// test('Response Table: Test View Delete Response Modal on cancel clicked', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#deleteResponseModal').exists).eql(false)
//     .click("#testID-questionID1-responseID3-0-delete")
//     .expect(Selector('#deleteResponseModal').exists).eql(true)

//     .click("#deleteResponseModal-cancelBtn")
//     .expect(Selector('#deleteResponseModal').exists).eql(false)
// });

// // THIS TEST REQUIRES THAT YOU PRELOAD THE test json data into mongoDB survey database
// test('Response Table: Test View Delete Response Modal on delete clicked', async t => {
//     await t
//     .typeText('#emailInput', accounts.surveysStudent.username)
//     .typeText('#passwordInput', accounts.surveysStudent.password)
//     .click('#loginButton')

//     .expect(Selector('#activeQuestionPage').exists).eql(true)
//     .click('#menuBtn')

//     .click('#surveyManagement-responses')
//     .expect(Selector('#responseTableMode').exists).eql(true)

//     .expect(Selector('#responseTableBody').child().count).gte(1, "There is at least one child element in the table")

//     // Actual code that deletes from the database. BE CAREFUL WHEN UNCOMMENTING THIS PART OUT
//     // .expect(Selector('#deleteResponseModal').exists).eql(false)
//     // .click("#testID-questionID1-responseID0-0-delete")
//     // .expect(Selector('#deleteResponseModal').exists).eql(true)

//     // .click("#deleteResponseModal-deleteBtn")
//     // .expect(Selector('#deleteResponseModal').exists).eql(false)
//     // .expect(Selector('#responseTableBody').child().count).eql(1)
// });