import React from 'react';
import AppMode from "./../../AppMode.js";

class CoursesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    viewStudents = (courseId, courseName) => {
        console.log("Opening students for courseId: " + courseId);

        // update courseID state in app
        this.props.changeCourse(courseId, courseName);
        this.props.changeMode(AppMode.STUDENTS);
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
            </tr> 
        );
        }
        return table;
    }

    render() {
        return(
            <div className="padded-page">
                <h1></h1>
                <table className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>Course Name</th>
                        <th>Year</th>
                        <th>Semester</th>
                        <th>Instructor Name</th>
                        <th>View Students</th>
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
            </div>
        )
    }
}

export default CoursesTable;