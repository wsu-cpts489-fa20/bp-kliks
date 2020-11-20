import { Selector } from 'testcafe';

var isLocalTesting = true;
const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';

fixture `Login Tests`
    .page(isLocalTesting ? DEV_TEST_URL : DEPLOY_TEST_URL)

test('Test login', async t => {
    await t
        .typeText('#emailInput', 'test35@wsu.edu')
        .typeText('#passwordInput', 'ASDFasdf12345')
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(10000)
        .expect(Selector('#FeedMode').visible).eql(true)
});