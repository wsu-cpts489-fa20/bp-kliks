// Main manage courses page
// From here a student can view courses they are in and see the students that are in their courses
// An intructor is able to add courses, delete courses, add students, upload a roster of students
// and add an individual student

import React from 'react';
import AppMode from '../../AppMode';
import StudentsTable from './StudentsTable.js';
import CoursesTable from './CoursesTable';
import FloatingButton from './../FloatingButton.js';
import UploadStudents from './UploadStudents.js';
import AddCourse from './AddCourse.js';
import AddStudent from './AddStudent';

class CoursesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: "",
            courseName: "",
            students: [],
        };
    }

    // changes the courses page mode to display different componeents based on state
    handleChangeMode = (newMode) => {
        this.setState({mode: newMode});

        // if state changed to courses, possibly reset the forms to remove old text
    }

    // fetches the students for the selected course
    handleChangeCourse = async (courseId, courseName) => {
        this.setState({
            courseId: courseId,
            courseName: courseName,
        });

        // Get the courses students
        let url = "/students/" + courseId;
        let res = await fetch(url, {method: 'GET'});
        if (res.status != 200) {
            let msg = await res.text();
            console.log("There was an error obtaining students in this course: " + msg);
            return;
        } 
        let body = await res.json();
        body = JSON.parse(body);
        console.log("in componentDidMount with GET results: " + body);
        this.setState({students: body});
    }

    // handle click on the add course button
    handleAddCourse = async () => {
        this.props.changeMode(AppMode.COURSES_CREATE);
    }

    // handle click on the add students button
    handleAddStudent = () => {
        
        this.props.changeMode(AppMode.STUDENTS_CREATE);
    }

    // handle click on upload students button
    handleUploadStudents = () => {
        //this.handleChangeMode(AppMode.STUDENTS_UPLOAD);
        this.props.changeMode(AppMode.STUDENTS_UPLOAD);
    }

    // upload the list of students extracted from csv file
    uploadStudents = async (students) => {

        // make a post request for each student
        for(const student of students) {
            var newData = {
                "userID" : student[0],
                "studentDisplayName": student[1],
                };
            
            const url = '/students/' + this.state.courseId;
            const res = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                method: 'POST',
                body: JSON.stringify(newData)}); 
            const msg = await res.text();
            if (res.status != 200) {
                console.log("Successfully added students");
            } else {
                console.log("Error adding students");
            }
        }

        // refetch the students list
        this.handleChangeCourse(this.state.courseId, this.state.courseName);
    }

    // handle adding a student to the currently selected course
    addStudent = async (newStudent) => {

        let url = '/students/' + this.state.courseId;
        let res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(newStudent)}); 
        const msg = await res.text();
        if (res.status != 200) {
            console.log("Successfully added student");
        } else {
            console.log("Error adding student");
        }

        // refetch the students list
        this.handleChangeCourse(this.state.courseId, this.state.courseName);

        // fetch the course in question so it can be added to the student's account
        url = "/courses/" + this.props.userObj.id;
        res = await fetch(url, {method: 'GET'});
        if (res.status != 200) {
            let msg = await res.text();
            console.log("There was an error obtaining students for instructor " + msg);
            return;
        } 
        let body = await res.json();
        body = JSON.parse(body);

        body = body.filter(function (response) {
            return response.courseID === this.state.courseId;
        }.bind(this));
        body = body[0];

        // add course to atudent's account
        this.addCourse(body, newStudent.userID);
    }

    editStudent = async (studentInfo, originalId) => {

        // update course using route
        const url = '/students/' + this.state.courseId + '/' + originalId;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(studentInfo)}); 
        const msg = await res.text();
        if (res.status != 200) {
            console.log("Student successfully updated");
        } else {
            console.log("Error occurred while updating student");
        }
        // refetch the students list
        this.handleChangeCourse(this.state.courseId, this.state.courseName);
    }

    deleteStudent = async (studentId) => {

       // delete using route
       const url = '/students/' + this.state.courseId + '/' + studentId;
       const res = await fetch(url, 
                    {method: 'DELETE'}); 
        if (res.status == 200) {
            console.log("Successfully deleted student")
        } else {
            const resText = await res.text();
            console.log("Student deletion failed with error: " + resText);
        }

        // refetch the students list
        this.handleChangeCourse(this.state.courseId, this.state.courseName);
    }

    addCourse = async (courseData, userId = this.props.userObj.id) => {

        const url = '/courses/' + userId;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(courseData)}); 
        const msg = await res.text();
        if (res.status != 200) {
            console.log("Successfully added course");
        } else {
            console.log("Error adding course");
        }

        this.props.updateUser();
    }

    render() {
        return (
            <div className="padded-page">
                <center>
                <h1>{this.props.mode === AppMode.COURSES || this.props.mode === AppMode.COURSES_DELETE || this.props.mode === AppMode.COURSES_EDIT || this.props.mode === AppMode.COURSES_CREATE ? "Courses" : "Students in " + this.state.courseName}</h1>

                {this.props.mode === AppMode.COURSES || this.props.mode === AppMode.COURSES_DELETE || this.props.mode === AppMode.COURSES_EDIT || this.props.mode === AppMode.COURSES_CREATE ?
                    <CoursesTable 
                    courses={this.props.userObj.courses}
                    userType={this.props.userObj.userType}
                    menuOpen={this.props.menuOpen}
                    changeMode={this.props.changeMode}
                    mode={this.props.mode}
                    userId={this.props.userObj.id}
                    changeCourse={this.handleChangeCourse}
                    updateUser={this.props.updateUser}/> :
                    <StudentsTable 
                    students={this.state.students}
                    userType={this.props.userObj.userType}
                    menuOpen={this.props.menuOpen}
                    changeMode={this.props.changeMode}
                    courseId={this.state.courseId}
                    mode={this.props.mode}
                    editStudent={this.editStudent}
                    deleteStudent={this.deleteStudent}/>
                }
                </center>

                {this.props.userObj.userType === "Instructor" &&  (this.props.mode === AppMode.STUDENTS || this.props.mode === AppMode.STUDENTS_CREATE) ?
                <div className="floatingbtn-container">
                <FloatingButton
                id={"AddStudentBtn"}
                handleClick={this.handleAddStudent}/>
                <FloatingButton
                id="UploadStudentsBtn"
                handleClick={this.handleUploadStudents}
                upload={true}/>
                </div> : null}

                {this.props.userObj.userType === "Instructor" && this.props.mode === AppMode.COURSES ?
                <FloatingButton
                id="AddCourseBtn"
                handleClick={this.handleAddCourse}/>
                : null}

                {this.props.mode === AppMode.STUDENTS_UPLOAD ? 
                <UploadStudents
                uploadStudents={this.uploadStudents}
                changeMode={this.props.changeMode} /> : null}

                {this.props.mode === AppMode.COURSES_CREATE ?
                <AddCourse
                changeMode={this.props.changeMode}
                addCourse={this.addCourse}
                instructorId={this.props.userObj.id} />
                : null}

                {this.props.mode === AppMode.STUDENTS_CREATE ?
                <AddStudent
                changeMode={this.props.changeMode}
                addStudent={this.addStudent}
                courseName={this.state.courseName} />
                : null}

            </div>
        );
    }   
}

export default CoursesPage;