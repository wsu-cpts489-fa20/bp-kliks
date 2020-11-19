import React from 'react';
import SearchField from 'react-search-field'
import AppMode from '../../AppMode';
import StudentsTable from './StudentsTable.js';
import CoursesTable from './CoursesTable';

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
            </div>
        );
    }   
}

export default CoursesPage;