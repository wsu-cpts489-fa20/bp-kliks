import { Selector } from 'testcafe';
import { accounts } from './config.js';

var isLocalTesting = true;
const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';


fixture `Questions/Survey Management Tests`
    .page(isLocalTesting ? DEV_TEST_URL : DEPLOY_TEST_URL);


/*
    BELOW ARE THE RESPONSE TABLE TESTS
*/    
test('Response Table: Test View Response Table', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)
});

test('Response Table: Test View Response', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#viewResponseModal').exists).eql(false)
    .click("#testID-questionID1-responseID3-0-view")
    .expect(Selector('#viewResponseModal').exists).eql(true)
});


test('Response Table: Test Cancel View Response', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#viewResponseModal').exists).eql(false)
    .click("#testID-questionID1-responseID3-0-view")
    .expect(Selector('#viewResponseModal').exists).eql(true)

    .click("#viewResponseModal-closeBtn")
    .expect(Selector('#viewResponseModal').exists).eql(false)
    .expect(Selector('#responseTableBody').exists).eql(true)
});


test('Response Table: Test Search Responses', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#viewResponseModal').exists).eql(false)

    .typeText('#searchResponses', 'Nov 22') //Search
    .pressKey('Enter')

    .click("#testID-questionID1-responseID3-0-view")
    .expect(Selector('#viewResponseModal').exists).eql(true)

    .click("#viewResponseModal-closeBtn")
    .expect(Selector('#viewResponseModal').exists).eql(false)
    .expect(Selector('#responseTableBody').exists).eql(true)
});

test('Test Sort by Question Responses', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#viewResponseModal').exists).eql(false)

    .click("#responseSortResponse")

    .expect(Selector('#responseTableBody').exists).eql(true)
});

test('Response Table: Test Sort by Question Type', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#viewResponseModal').exists).eql(false)

    .click("#responseSortQuestionType")

    .expect(Selector('#responseTableBody').exists).eql(true)
});

test('Response Table: Test Sort by Question', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#viewResponseModal').exists).eql(false)

    .click("#responseSortQuestion")

    .expect(Selector('#responseTableBody').exists).eql(true)
});

test('Response Table: Test Sort by Response Date-Time', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#viewResponseModal').exists).eql(false)

    .click("#responseSortDate")

    .expect(Selector('#responseTableBody').exists).eql(true)
});

test('Response Table: Test View Delete Response Modal', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#deleteResponseModal').exists).eql(false)
    .click("#testID-questionID1-responseID3-0-delete")
    .expect(Selector('#deleteResponseModal').exists).eql(true)
});

test('Response Table: Test View Delete Response Modal on cancel clicked', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#deleteResponseModal').exists).eql(false)
    .click("#testID-questionID1-responseID3-0-delete")
    .expect(Selector('#deleteResponseModal').exists).eql(true)

    .click("#deleteResponseModal-cancelBtn")
    .expect(Selector('#deleteResponseModal').exists).eql(false)
});

// THIS TEST REQUIRES THAT YOU PRELOAD THE test json data into mongoDB survey database
test('Response Table: Test View Delete Response Modal on delete clicked', async t => {
    await t
    .typeText('#emailInput', accounts.surveysStudent.username)
    .typeText('#passwordInput', accounts.surveysStudent.password)
    .click('#loginButton')

    .expect(Selector('#activeQuestionPage').exists).eql(true)
    .click('#menuBtn')

    .click('#surveyManagement-responses')
    .expect(Selector('#responseTableMode').exists).eql(true)

    .expect(Selector('#responseTableBody').child().count).gte(1, "There is at least one child element in the table")

    // Actual code that deletes from the database. BE CAREFUL WHEN UNCOMMENTING THIS PART OUT
    // .expect(Selector('#deleteResponseModal').exists).eql(false)
    // .click("#testID-questionID1-responseID0-0-delete")
    // .expect(Selector('#deleteResponseModal').exists).eql(true)

    // .click("#deleteResponseModal-deleteBtn")
    // .expect(Selector('#deleteResponseModal').exists).eql(false)
    // .expect(Selector('#responseTableBody').child().count).eql(1)
});