// Students table displays the students in a currently selected course

import React from 'react';
import AppMode from "./../../AppMode.js";

class StudentsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    // handles a click on edit student button in the table
    editStudent = (userId) => {
        console.log("Editing student: " + userId);
    }

    // handles a click on delete student button in the table
    deleteStudent = (userId) => {
        console.log("Deleting student: " + userId);
    }

    //renderTable -- render an HTML table displaying the rounds logged
    //by the current user and providing buttons to view/edit and delete each round.
    renderTable = () => {
        let table = [];
        for (const r in this.props.students) {
        table.push(
            <tr key={r}>
            <td>{this.props.students[r].userID}</td>
            <td>{this.props.students[r].studentDisplayName}</td>
            <td><button onClick={this.props.menuOpen ? null : () => 
                this.editStudent(this.props.students[r].userID)}>
                    <span className="fa fa-pencil-square-o"></span></button></td>
            <td><button onClick={this.props.menuOpen ? null : () => 
                this.deleteStudent(this.props.students[r].userID)}>
                    <span className="fa fa-trash-o"></span></button></td>
            </tr> 
        );
        }
      return table;
    }

    render() {
        return(
            <div className="padded-page">
                <h1></h1>
                <table id="StudentsTable" className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Edit</th>
                        <th>Delete</th>
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
            </div>
        )
    }
}

export default StudentsTable;