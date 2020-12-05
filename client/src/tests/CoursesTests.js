import { Selector } from 'testcafe';
import { accounts, isLocalTesting } from './config.js';

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
        .click('.floatbtn')
        
        // All contents are filled
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseName', 'Biology')
        .typeText('#courseNumber', '101')
        .typeText('#courseSemester', 'Spring')
        .typeText('#courseYear', '2021')
        .typeText('#courseFirstName', 'Bob')
        .typeText('#courseLastName', 'Henry')
        .typeText('#courseEnrollmentLimit', '150')
        .typeText('#courseNotes', 'Easy course this semester')
        .click('#saveCourse')

        .expect(Selector('#CoursesTable').visible).eql(true)
        .expect(Selector('.floatbtn').visible).eql(true)
        .click('.floatbtn')

        // All contents are filled but the course submission is cancelled
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseName', 'Biology')
        .typeText('#courseNumber', '102')
        .typeText('#courseSemester', 'Fall')
        .typeText('#courseYear', '2021')
        .typeText('#courseFirstName', 'Bob')
        .typeText('#courseLastName', 'Henry')
        .typeText('#courseEnrollmentLimit', '100')
        .typeText('#courseNotes', 'Hard course this semester')
        .click('#cancelCourse')

        .expect(Selector('#CoursesTable').visible).eql(true)
        .expect(Selector('.floatbtn').visible).eql(true)
        .click('.floatbtn')

        // No content is filled and save is not successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .click('#saveCourse')
        .expect(Selector('#AddCourseModal').visible).eql(true)

        // Only course name is filled, save not successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseName', 'Physics')
        .click('#saveCourse')
        .expect(Selector('#AddCourseModal').visible).eql(true)

        // Only course name and number are filled, save not successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseNumber', '201')
        .click('#saveCourse')
        .expect(Selector('#AddCourseModal').visible).eql(true)

        // Only course name, number, semester are filled, save not successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseSemester', 'Spring')
        .click('#saveCourse')
        .expect(Selector('#AddCourseModal').visible).eql(true)

        // Only course name, number, semester, year are filled, save not successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseYear', '2021')
        .click('#saveCourse')
        .expect(Selector('#AddCourseModal').visible).eql(true)

        // Only course name, number, semester, year, firstname are filled, save not successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseFirstName', 'Martin')
        .click('#saveCourse')
        .expect(Selector('#AddCourseModal').visible).eql(true)

        // Only course name, number, semester, year, firstname, lastname are filled, save not successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseLastName', 'Derrickson')
        .click('#saveCourse')
        .expect(Selector('#AddCourseModal').visible).eql(true)

        // All content but notes is filled since its not required, save successful
        .expect(Selector('#AddCourseModal').visible).eql(true)
        .typeText('#courseEnrollmentLimit', '110')
        .click('#saveCourse')

        .expect(Selector('#CoursesTable').visible).eql(true)
        .expect(Selector('.floatbtn').visible).eql(true)
        .wait(3000)
});

// View Students in the courses student list
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

        .click('#studentView')

        .expect(Selector('#StudentsTable').visible).eql(true)
        .wait(3000)
});

test('Courses: Test Instructor Course Table Populated Due to Slow Database Speed', async t => {
    await t
        .typeText('#emailInput', accounts.coursesInstructor.username)
        .typeText('#passwordInput', accounts.coursesInstructor.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(5000)

        .expect(Selector('#CoursesMode').visible).eql(true)
        .click('#CoursesMode')

        .expect(Selector('#CoursesTable').visible).eql(true)
        .expect(Selector('.floatbtn').visible).eql(true)
        .wait(3000)
        //.expect(Selector('.backbtn').visible).eql(true)
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
        .wait(3000)
        //.expect(Selector('.backbtn').visible).eql(true)
});

// test('Courses: Test Student Students Table', async t => {
//     await t
//         .typeText('#emailInput', accounts.coursesStudent.username)
//         .typeText('#passwordInput', accounts.coursesStudent.password)
//         .expect(Selector('#LoginMode').visible).eql(true)
//         .click('#loginButton').wait(5000)

//         .expect(Selector('#CoursesMode').visible).eql(true)
//         .click('#CoursesMode')

//         .expect(Selector('.fa-users').visible).eql(true)
//         .click('.fa-users')

//         .expect(Selector('#StudentsTable').visible).eql(true)

//         .expect(Selector('.floatbtn').visible).eql(false)
//         .expect(Selector('.floatbtn-upload').visible).eql(false)
//         .expect(Selector('.backbtn').visible).eql(true)
// });