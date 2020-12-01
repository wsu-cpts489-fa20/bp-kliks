import { Selector } from 'testcafe';
import { accounts } from './config.js';

var isLocalTesting = true;
const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';

fixture `Login Tests`
    .page(isLocalTesting ? DEV_TEST_URL : DEPLOY_TEST_URL)

test('Test login', async t => {
    await t
        .typeText('#emailInput', accounts.coursesInstructor.username)
        .typeText('#passwordInput', accounts.coursesInstructor.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(10000)
        .expect(Selector('#activeQuestionPage').visible).eql(true)
});