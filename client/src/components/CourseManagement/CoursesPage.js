import React from 'react';
import SearchField from 'react-search-field'
import AppMode from '../../AppMode';
import StudentsTable from './StudentsTable.js';
import CoursesTable from './CoursesTable';
import FloatingButton from './../FloatingButton.js';

class CoursesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: AppMode.COURSES,
            courseId: "",
            courseName: "",
            students: [],
        };
    }

    handleChangeMode = (newMode) => {
        this.setState({mode: newMode});

        // if state changed to courses, possibly reset the course id/name
    }

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

    handleAddCourse = async () => {
        console.log("Adding a course for user: " + this.props.userObj.id);
    }

    handleAddStudent = async () => {
        console.log("Adding a student for course: " + this.state.courseId);
    }

    handleUploadStudents = async () => {
        console.log("Uploading students for course: " + this.state.courseId);
    }

    render() {
        return (
            <div className="padded-page">
                <center>
                <h1>{this.state.mode === AppMode.COURSES ? "Courses" : "Students in " + this.state.courseName}</h1>

                {this.state.mode === AppMode.COURSES ?
                    <CoursesTable 
                    courses={this.props.userObj.courses}
                    menuOpen={this.props.menuOpen}
                    changeMode={this.handleChangeMode}
                    changeCourse={this.handleChangeCourse}/> :
                    <StudentsTable 
                    students={this.state.students}
                    menuOpen={this.props.menuOpen}
                    changeMode={this.handleChangeMode}/>
                }
                </center>
                {this.props.userObj.userType === "instructor" &&  this.state.mode === AppMode.STUDENTS ?
                <div className="floatingbtn-container">
                <FloatingButton
                handleClick={this.handleAddStudent}/>
                <FloatingButton
                handleClick={this.handleUploadStudents}
                upload={true}/>
                </div> : null}
                {this.props.userObj.userType === "instructor" && this.state.mode === AppMode.COURSES ?
                <FloatingButton
                handleClick={this.handleAddCourse}/>
                : null}

            </div>
        );
    }   
}

export default CoursesPage;