import { Selector } from 'testcafe';

// fixture `SpeedScore Interactions`
//     .page `http://127.0.0.1:5500/index.html`;

// fixture `Kliks Login Tests`
//     .page `http://127.0.0.1:5500/index.html` //`https://kliks.bfapp.org/`; //http://localhost/  



fixture `TODO list test`
    .page('http://localhost:8081')

test('Check list item', async t => {
    // const appElement = ReactSelector('App');
    // await t.expect(ReactSelector('App').exists).eql(true).wait(1000)
    // await t.expect(appElement.getReact(({ state }) => state.mode)).eql("Login")

    await t
        .typeText('#emailInput', 'test35@wsu.edu')
        .typeText('#passwordInput', 'ASDFasdf12345')
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(10000)
        .expect(Selector('#FeedMode').visible).eql(true)
        // .expect(appElement.getReact(({ state }) => state.statusMsg)).eql("Login")
        // .expect(appElement.getReact(({ state }) => state.statusMsg)).eql("Login")
    // const appComponent  = await appElement.getReact();
    // console.log(appComponent);

    // await t.expect(appComponent.props.priority).eql('High');
    // await t.expect(appComponent.state.mode).eql("Login");

    // await t.expect(component.key).eql('componentID');
});

// test('LoginGoesToMainPage', async t => {
//     await t
//     .typeText('#emailInput', 'test35@wsu.edu')
//     .typeText('#passwordInput', 'ASDFasdf12345')
//     .click('#loginBtn')
//     .expect(Selector('#feedModeDiv').visible).eql(true)
// });

// test('LoginGoesToCreate', async t => {
//     await t
//         .expect(true).ok("This is a test to check to make sure GitHub Actions TestCafe workflow works");
// });

// test('LoginGoesToReset', async t => {
//     await t
//         .expect(true).ok("This is a test to check to make sure GitHub Actions TestCafe workflow works");
// });