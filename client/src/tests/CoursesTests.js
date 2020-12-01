import { Selector } from 'testcafe';
import { accounts } from './config.js';

var isLocalTesting = true;
const DEPLOY_TEST_URL = 'https://kliks.bfapp.org/';
const DEV_TEST_URL = 'http://localhost:8081';


fixture `Courses Tests`
    .page(isLocalTesting ? DEV_TEST_URL : DEPLOY_TEST_URL);


test('Courses: Test Instructor Courses Table and Buttons', async t => {
    await t
        .typeText('#emailInput', accounts.coursesInstructor.username)
        .typeText('#passwordInput', accounts.coursesInstructor.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(5000)

        .expect(Selector('#CoursesMode').visible).eql(true)
        .click('#CoursesMode')

        .expect(Selector('#CoursesTable').visible).eql(true)
        .expect(Selector('.floatbtn').visible).eql(true)
});

test('Courses: Test Student Courses Table', async t => {
    await t
        .typeText('#emailInput', accounts.coursesStudent.username)
        .typeText('#passwordInput', accounts.coursesStudent.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(5000)

        .expect(Selector('#CoursesMode').visible).eql(true)
        .click('#CoursesMode')

        .expect(Selector('#CoursesTable').visible).eql(true)
        .expect(Selector('.floatbtn').visible).eql(false)
});

test('Courses: Test Instructor Students Table and Buttons', async t => {
    await t
        .typeText('#emailInput', accounts.coursesInstructor.username)
        .typeText('#passwordInput', accounts.coursesInstructor.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(5000)

        .expect(Selector('#CoursesMode').visible).eql(true)
        .click('#CoursesMode')

        .expect(Selector('.fa-users').visible).eql(true)
        .click('.fa-users')

        .expect(Selector('#StudentsTable').visible).eql(true)

        .expect(Selector('.floatbtn').visible).eql(true)
        .expect(Selector('.floatbtn-upload').visible).eql(true)
        .expect(Selector('.backbtn').visible).eql(true)
});

test('Courses: Test Student Students Table', async t => {
    await t
        .typeText('#emailInput', accounts.coursesStudent.username)
        .typeText('#passwordInput', accounts.coursesStudent.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(5000)

        .expect(Selector('#CoursesMode').visible).eql(true)
        .click('#CoursesMode')

        .expect(Selector('.fa-users').visible).eql(true)
        .click('.fa-users')

        .expect(Selector('#StudentsTable').visible).eql(true)

        .expect(Selector('.floatbtn').visible).eql(false)
        .expect(Selector('.floatbtn-upload').visible).eql(false)
        .expect(Selector('.backbtn').visible).eql(true)
});