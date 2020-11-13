import { async } from 'regenerator-runtime'
import { Selector } from 'testcafe';

// fixture `SpeedScore Interactions`
//     .page `http://127.0.0.1:5500/index.html`;

fixture `Kliks Login Tests`
    .page `https://kliks.bfapp.org/`; //http://localhost/  
    
test('LoginGoesToMainPage', async t => {
    await t
    .typeText('#emailInput', 'test35@wsu.edu')
    .typeText('#passwordInput', 'ASDFasdf12345')
    .click('#loginBtn')
    .expect(Selector('#feedModeDiv').visible).eql(true)
});

test('LoginGoesToCreate', async t => {
    await t
        .expect(true).ok("This is a test to check to make sure GitHub Actions TestCafe workflow works");
});

test('LoginGoesToReset', async t => {
    await t
        .expect(true).ok("This is a test to check to make sure GitHub Actions TestCafe workflow works");
});