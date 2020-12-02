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
        console.log("Adding a course for user: " + this.props.userObj.id);
    }

    // handle click on the add students button
    handleAddStudent = () => {
        //this.handleChangeMode(AppMode.STUDENTS_CREATE);
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
        console.log("Adding a student for course: " + this.state.courseId);
    }

    render() {
        return (
            <div className="padded-page">
                <center>
                <h1>{this.props.mode === AppMode.COURSES ? "Courses" : "Students in " + this.state.courseName}</h1>

                {this.props.mode === AppMode.COURSES ?
                    <CoursesTable 
                    courses={this.props.userObj.courses}
                    userType={this.props.userObj.userType}
                    menuOpen={this.props.menuOpen}
                    changeMode={this.props.changeMode}
                    changeCourse={this.handleChangeCourse}/> :
                    <StudentsTable 
                    students={this.state.students}
                    userType={this.props.userObj.userType}
                    menuOpen={this.props.menuOpen}
                    changeMode={this.props.changeMode}/>
                }
                </center>

                {this.props.userObj.userType === "Instructor" &&  this.props.mode === AppMode.STUDENTS ?
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

                {this.props.mode === AppMode.STUDENTS ?
                <button type="button"
                onClick={ () => { this.props.changeMode(AppMode.COURSES);} }
                className="backbtn">
                    Back
                </button> : null}

            </div>
        );
    }   
}

export default CoursesPage;