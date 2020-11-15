import { Selector } from 'testcafe';

var isLocalTesting = true;
const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';


fixture `Student Tests`
    .page(isLocalTesting ? DEV_TEST_URL : DEV_TEST_URL);

test('Test Tempalte', async t => {
    await t
    .expect(true).ok("This is a test to check to make sure GitHub Actions TestCafe workflow works");
});