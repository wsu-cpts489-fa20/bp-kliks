import { Selector } from 'testcafe';

fixture `Login Tests`
    .page('http://localhost:8081')

test('Test login', async t => {
    await t
        .typeText('#emailInput', 'test35@wsu.edu')
        .typeText('#passwordInput', 'ASDFasdf12345')
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(10000)
        .expect(Selector('#FeedMode').visible).eql(true)
});