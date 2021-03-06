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

test('Courses: Test Instructor Edit Course', async t => {
    await t
        .typeText('#emailInput', accounts.coursesInstructor.username)
        .typeText('#passwordInput', accounts.coursesInstructor.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(5000)

        .expect(Selector('#CoursesMode').visible).eql(true)
        .click('#CoursesMode')

        .expect(Selector('#CoursesTable').visible).eql(true)

         // The newly added course at the bottom of the list is the one we want to edit
         .expect(Selector('.course-row:last-of-type').visible).eql(true)
         .expect(Selector('.course-row:last-of-type .edit-course-btn').visible).eql(true)
         .click('.edit-course-btn:last-of-type')

        // No content is filled and save is not successful
        .expect(Selector('#EditCourseModal').visible).eql(true)
        .click('.edit-course-btn:last-of-type')
        .expect(Selector('#EditCourseModal').visible).eql(true)

         .expect(Selector('.course-row:last-of-type').visible).eql(true)
         .expect(Selector('.course-row:last-of-type .edit-course-btn').visible).eql(true)
         .click('.edit-course-btn:last-of-type')
        
        // All contents are filled but the course submission is cancelled
        .expect(Selector('#EditCourseModal').visible).eql(true)
        .typeText('#name', 'Edited Course')
        .typeText('#number', '322')
        .typeText('#semester', 'Spring')
        .typeText('#year', '2021')
        .typeText('#instructorFirstName', 'Edited Martin')
        .typeText('#instructorLastName', 'Dickinson')
        .typeText('#enrollmentLimit', '25')
        .typeText('#notes', 'Edited note')
        .click('.cancel-edit-course')

        .expect(Selector('#CoursesTable').visible).eql(true)
        .click('.edit-course-btn:last-of-type')

        // All contents are filled and edit is made
        .expect(Selector('#EditCourseModal').visible).eql(true)
        .typeText('#name', 'Edited Course')
        .typeText('#number', '322')
        .typeText('#semester', 'Spring')
        .typeText('#year', '2021')
        .typeText('#instructorFirstName', 'Edited Martin')
        .typeText('#instructorLastName', 'Dickinson')
        .typeText('#enrollmentLimit', '25')
        .typeText('#notes', 'Edited note')
        .click('.edit-course')

        .expect(Selector('#CoursesTable').visible).eql(true)

        // verify content is edited
        .expect(Selector('.course-name-value').textContent).contains('Edited')
});

test('Courses: Test Instructor Delete Course', async t => {
    await t
        .typeText('#emailInput', accounts.coursesInstructor.username)
        .typeText('#passwordInput', accounts.coursesInstructor.password)
        .expect(Selector('#LoginMode').visible).eql(true)
        .click('#loginButton').wait(5000)

        .expect(Selector('#CoursesMode').visible).eql(true)
        .click('#CoursesMode')

        // Delete course at top of list
        .expect(Selector('.course-row').visible).eql(true)
        .expect(Selector('.delete-course-btn').visible).eql(true)
        .click('.delete-course-btn')

        //verify modal is open
        .expect(Selector('#ConfirmCourseDeleteModal').visible).eql(true)

        // cancel deletion by hitting x button
        .click('#modalClose')
        .expect(Selector('#ConfirmCourseDeleteModal').visible).eql(false)

        // cancel deletion by hitting cancel button
        .click('.delete-course-btn')
        .click('.cancel-delete-course')
        .expect(Selector('#ConfirmCourseDeleteModal').visible).eql(false)

        // perform deletion
        .click('.delete-course-btn')
        .click('.delete-course')
        .expect(Selector('#ConfirmCourseDeleteModal').visible).eql(false)
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

test('Courses: Test Instructor Course Table Populated', async t => {
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
});

test('Courses: Test Instructor Students Table and Buttons Visible', async t => {
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
});

test('Courses: Test Instructor Add Student', async t => {
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

        // submit with both fields empty
        .click('.floatbtn')
        .expect(Selector('#AddStudentModal').visible).eql(true)
        .click('#saveStudent')

        // submit with id field empty
        .click('.floatbtn')
        .expect(Selector('#AddStudentModal').visible).eql(true)
        .typeText('#displayName', "Test Student")
        .click('#saveStudent')
        .expect(Selector('#StudentsTable').visible).eql(true)

        // close both ways after filling form
        .click('.floatbtn')
        .expect(Selector('#AddStudentModal').visible).eql(true)
        .typeText('#id', accounts.coursesStudent.username)
        .click('#cancelStudent')
        .expect(Selector('#StudentsTable').visible).eql(true)

        .click('.floatbtn')
        .expect(Selector('#AddStudentModal').visible).eql(true)
        .typeText('#id', accounts.coursesStudent.username)
        .typeText('#displayName', "Test Student")
        .click('#modalClose')
        .expect(Selector('#StudentsTable').visible).eql(true)

        // valid submission
        .click('.floatbtn')
        .expect(Selector('#AddStudentModal').visible).eql(true)
        .typeText('#id', accounts.coursesStudent.username)
        .typeText('#displayName', "Test Student")
        .click('#saveStudent')
        .expect(Selector('#StudentsTable').visible).eql(true)
});

test('Courses: Test Instructor Edit Student', async t => {
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

        .expect(Selector('.edit-student-btn').visible).eql(true)

        // close both ways after filling form
        .click('.edit-student-btn')
        .expect(Selector('#EditStudentModal').visible).eql(true)
        .click('#cancelStudent')
        .expect(Selector('#StudentsTable').visible).eql(true)

        .click('.edit-student-btn')
        .expect(Selector('#EditStudentModal').visible).eql(true)
        .click('#modalClose')
        .expect(Selector('#StudentsTable').visible).eql(true)

        // valid submission
        .click('.edit-student-btn')
        .expect(Selector('#EditStudentModal').visible).eql(true)
        .typeText('#id', accounts.coursesStudent.username)
        .typeText('#displayName', "Edited")
        .click('#saveStudent')
        .expect(Selector('#StudentsTable').visible).eql(true)

        // verify content is edited
        .expect(Selector('.student-name-value').textContent).contains('Edited')
});

test('Courses: Test Instructor Delete Student', async t => {
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

        // Delete student at top of list
        .expect(Selector('.student-row').visible).eql(true)
        .expect(Selector('.delete-student-btn').visible).eql(true)
        .click('.delete-student-btn')

        //verify modal is open
        .expect(Selector('#ConfirmStudentDeleteModal').visible).eql(true)

        // cancel deletion by hitting x button
        .click('#modalClose')
        .expect(Selector('#ConfirmStudentDeleteModal').visible).eql(false)

        // cancel deletion by hitting cancel button
        .click('.delete-student-btn')
        .click('.cancel-delete-student')
        .expect(Selector('#ConfirmStudentDeleteModal').visible).eql(false)

        // perform deletion
        .click('.delete-student-btn')
        .click('.delete-student')
        .expect(Selector('#ConfirmCourseDeleteModal').visible).eql(false)
});

test('Courses: Test Instructor Students Upload', async t => {
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

        .expect(Selector('.floatbtn-upload').visible).eql(true)
        .click('.floatbtn-upload')

        // try uploading without creating a file
        .click('.submit-upload')

        .click('.floatbtn-upload')

        // close modal both ways
        .setFilesToUpload('.file-input', [
            './uploads/test_upload.csv'
        ])
        .click('.cancel-upload')

        .click('.floatbtn-upload')

        // close modal both ways
        .setFilesToUpload('.file-input', [
            './uploads/test_upload.csv'
        ])
        .click('#modalClose')

        .click('.floatbtn-upload')

        // submit upload
        .setFilesToUpload('.file-input', [
            './uploads/test_upload.csv'
        ])
        .click('.submit-upload')
});