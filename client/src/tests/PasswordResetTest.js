import { Selector } from 'testcafe';
import { accounts, isLocalTesting } from './config.js';

const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';

fixture `kliks`
    .page(isLocalTesting ? DEV_TEST_URL : DEPLOY_TEST_URL);

test('Verify valid new password', async t => {
    await t
    // Reset the password
    .click('#ResetPassword')
    .typeText('#AccountEmail', accounts.coursesStudent.username)
    .click('#AccountButton')
    .typeText('#SecurityAnswer', 'Hi')
    .click('#SecurityButton')
    .typeText('#NewPassword', 'NewPassword123!')
    .typeText('#RepeatPassword', 'NewPassword123!')
    .click('#PasswordButton')

    // Login to verify password change
    .typeText('#emailInput', accounts.coursesStudent.username)
    .typeText('#passwordInput', 'NewPassword123!')
    .click('#loginButton')
});

test('Verify invalid security answer error', async t => {
    await t
    // Reset the password
    .click('#ResetPassword')
    .typeText('#AccountEmail', accounts.coursesStudent.username)
    .click('#AccountButton')
    .typeText('#SecurityAnswer', 'Invalid answer')
    .click('#SecurityButton')

    .expect(Selector('.modal-body .emphasis').visible).eql(true)
    .expect(Selector('.modal-body .emphasis').textContent).contains('Sorry, that is not the correct answer to the security question. Try again.')
});

test('Verify invalid password format', async t => {
    await t
    // Reset the password
    .click('#ResetPassword')
    .typeText('#AccountEmail', accounts.coursesStudent.username)
    .click('#AccountButton')
    .typeText('#SecurityAnswer', 'Hi')
    .click('#SecurityButton')
    .typeText('#NewPassword', 'invalid')
    .typeText('#RepeatPassword', 'invalid')
    .click('#PasswordButton')

    // verify modal is still visible since password was invalid
    .expect(Selector('.modal').visible).eql(true)
});

test('Reset to previous password', async t => {
    await t
    // Reset the password
    .click('#ResetPassword')
    .typeText('#AccountEmail', accounts.coursesStudent.username)
    .click('#AccountButton')
    .typeText('#SecurityAnswer', 'Hi')
    .click('#SecurityButton')
    .typeText('#NewPassword', accounts.coursesStudent.password)
    .typeText('#RepeatPassword', accounts.coursesStudent.password)
    .click('#PasswordButton')

    // Login to verify password change
    .typeText('#emailInput', accounts.coursesStudent.username)
    .typeText('#passwordInput', accounts.coursesStudent.password)
    .click('#loginButton')
});