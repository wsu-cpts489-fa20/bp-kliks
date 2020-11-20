import { Selector } from 'testcafe';

fixture `kliks`
.page `http://localhost:8081`;

test('Reset Test', async t => {
    await t
    // Reset the password
    .click('#ResetPassword')
    .typeText('#AccountEmail', 'marco.arceo@wsu.edu')
    .click('#AccountButton')
    .typeText('#SecurityAnswer', 'asd')
    .click('#SecurityButton')
    .typeText('#NewPassword', 'Hello1234')
    .typeText('#RepeatPassword', 'Hello1234')
    .click('#PasswordButton')

    // Login to verify password change
    .typeText('#emailInput', 'marco.arceo@wsu.edu')
    .typeText('#passwordInput', 'Hello1234')
    .click('#loginButton')
});