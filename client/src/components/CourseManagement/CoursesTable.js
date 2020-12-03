// A table that displays all the courses a student is in

import React from 'react';
import AppMode from "./../../AppMode.js";
import DeleteCourse from './DeleteCourse.js';

class CoursesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: "",
            courseName: "",
        };
    }

    viewStudents = (courseId, courseName) => {
        console.log("Opening students for courseId: " + courseId);

        // update courseID state in app
        this.props.changeCourse(courseId, courseName);
        this.props.changeMode(AppMode.STUDENTS);
    }

    handleEditCourse = (courseId) => {
        console.log("Editing " + courseId);
        this.setState({courseId: courseId});
    }

    handleDeleteCourse = (id, name) => {
        console.log("Deleting " + id);

        this.setState({
            courseId: id,
            courseName: name
        });

        this.props.changeMode(AppMode.COURSES_DELETE);
    }

    deleteCourse = async (courseId) => {
       const url = '/courses/' + this.props.userId + '/' + courseId;
       const res = await fetch(url, 
                    {method: 'DELETE'}); 
        if (res.status == 200) {
            console.log("Successfully deleted course")
        } else {
            const resText = await res.text();
            console.log("Course deletion failed with error: " + resText);
        }

        this.props.changeMode(AppMode.COURSES);
    }

    //renderTable -- render an HTML table displaying the rounds logged
    //by the current user and providing buttons to view/edit and delete each round.
    renderTable = () => {
        let table = [];
        for (const r in this.props.courses) {
        table.push(
            <tr key={r}>
            <td>{this.props.courses[r].courseName}</td>
            <td>{this.props.courses[r].courseYear}</td>
            <td>{this.props.courses[r].courseSemester}</td>
            <td>{"" + this.props.courses[r].courseInstructorFirstName + " " + 
                    this.props.courses[r].courseInstructorLastName + ""}
            </td>
            <td><button onClick={this.props.menuOpen ? null : () => 
                this.viewStudents(this.props.courses[r].courseID, this.props.courses[r].courseName)}>
                    <span className="fa fa-users"></span></button></td>
            {this.props.userType === "Instructor" ? 
                <div className="instructor-buttons">
                    <td><button onClick={this.props.menuOpen ? null : () => 
                        this.handleEditCourse(this.props.courses[r].courseID)}>
                            <span className="fa fa-pencil-square-o"></span></button></td>
                    <td><button onClick={this.props.menuOpen ? null : () => 
                        this.handleDeleteCourse(this.props.courses[r].courseID, this.props.courses[r].courseName)}>
                            <span className="fa fa-trash-o"></span></button></td>
                </div> : null}
            </tr> 
        );
        }
        return table;
    }

    render() {
        return(
            <div className="padded-page">
                <h1></h1>
                <table id="CoursesTable" className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>Course Name</th>
                        <th>Year</th>
                        <th>Semester</th>
                        <th>Instructor Name</th>
                        <th>View Students</th>
                        {this.props.userType === "Instructor" ? 
                        <div className="instructor-buttons">
                            <th>Edit</th>
                            <th>Delete</th>
                        </div> : null}
                        
                    </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.courses).length === 0 ? 
                        <tr>
                        <td colSpan="5" style={{fontStyle: "italic"}}>You don't have any courses</td>
                        </tr> : this.renderTable()
                        }
                    </tbody>
                </table>
                {this.props.mode === AppMode.COURSES_DELETE ?
                <DeleteCourse
                changeMode={this.props.changeMode}
                deleteCourse={this.deleteCourse}
                courseId={this.state.courseId}
                courseName={this.state.courseName} />
                : null}
            </div>
        )
    }
}

export default CoursesTable;