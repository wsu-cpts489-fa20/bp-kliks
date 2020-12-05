import { Selector } from 'testcafe';
import { accounts, isLocalTesting } from './config.js';

const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';


fixture `Dashboard Tests`
    .page(isLocalTesting ? DEV_TEST_URL : DEPLOY_TEST_URL);

test('Test Tempalte', async t => {
    await t
    .expect(true).ok("This is a test to check to make sure GitHub Actions TestCafe workflow works");
});