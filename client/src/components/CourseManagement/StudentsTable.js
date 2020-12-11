// Students table displays the students in a currently selected course

import React from 'react';
import AppMode from "./../../AppMode.js";
import EditStudent from "./EditStudent.js";
import DeleteStudent from "./DeleteStudent.js";

class StudentsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            displayName: "",
        };
    }

    // handles a click on edit student button in the table
    handleEditStudent = (userId, display) => {

        this.setState({
            id: userId,
            displayName: display,
        });

        this.props.changeMode(AppMode.STUDENTS_EDIT);
        console.log("Editing student: " + userId);
    }

    // handles a click on delete student button in the table
    handleDeleteStudent = (userId, displayName) => {
        console.log("Deleting student: " + userId);

        this.setState({
            id: userId,
            displayName: displayName,
        });

        this.props.changeMode(AppMode.STUDENTS_DELETE);
    }

    editStudent = async (studentInfo, originalId) => {
        console.log(studentInfo);

        this.props.editStudent(studentInfo, originalId);
    }

    deleteStudent = async () => {
        console.log(this.state.id);

        this.props.deleteStudent(this.state.id);
    }

    //renderTable -- render an HTML table displaying the rounds logged
    //by the current user and providing buttons to view/edit and delete each round.
    renderTable = () => {
        let table = [];
        for (const r in this.props.students) {
        table.push(
            <tr key={r}>
            <td>{this.props.students[r].studentDisplayName}</td>
            <td>{this.props.students[r].userID}</td>
            {this.props.userType === "Instructor" ? 
                <div className="instructor-buttons">
                    <td><button onClick={this.props.menuOpen ? null : () => 
                        this.handleEditStudent(this.props.students[r].userID, this.props.students[r].studentDisplayName)}>
                            <span className="fa fa-pencil-square-o"></span></button></td>
                    <td><button onClick={this.props.menuOpen ? null : () => 
                        this.handleDeleteStudent(this.props.students[r].userID, this.props.students[r].studentDisplayName)}>
                            <span className="fa fa-trash-o"></span></button></td>
                </div> : null}
            </tr> 
        );
        }
      return table;
    }

    render() {
        console.log(this.props.mode);
        return(
            <div className="padded-page">
                <h1></h1>
                <table id="StudentsTable" className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        {this.props.userType === "Instructor" ? 
                        <div className="instructor-buttons">
                            <th>Edit</th>
                            <th>Delete</th>
                        </div> : null}
                    </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.students).length === 0 ? 
                        <tr>
                        <td colSpan="5" style={{fontStyle: "italic"}}>There aren't any students in this course</td>
                        </tr> : this.renderTable()
                        }
                    </tbody>
                </table>

                {this.props.mode === AppMode.STUDENTS_EDIT ?
                <EditStudent
                changeMode={this.props.changeMode}
                editStudent={this.editStudent}
                displayName={this.state.displayName}
                id={this.state.id} />
                : null}

                {this.props.mode === AppMode.STUDENTS_DELETE ?
                <DeleteStudent
                changeMode={this.props.changeMode}
                deleteStudent={this.deleteStudent}
                studentName={this.state.displayName}/>
                : null}
            </div>
        )
    }
}

export default StudentsTable;