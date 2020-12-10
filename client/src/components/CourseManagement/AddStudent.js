// A modal for adding a student to an existing course
// Only an instructor can do this

import React from 'react';
import AppMode from "./../../AppMode.js";

class AddStudent extends React.Component {
    constructor(props) {
        super(props);

        this.idRef = React.createRef();
        this.displayNameRef = React.createRef();

        this.state = {
            id: "",
            displayName: "",
        };
    }

    // handles the modal closure
    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.STUDENTS);
    }

    // handles create button click
    handleCreateSubmit = (event) => {
        event.preventDefault();

        const newStudent = {
            userID: this.state.id,
            studentDisplayName: this.state.displayName,
        };

        this.props.addStudent(newStudent);
        this.props.changeMode(AppMode.STUDENTS);
    }

    // called everytime a field in the form changes value
    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    

    render() {
        return (
            <div id="aboutModal" className="modal" role="dialog">
                <div id="AddCourseModal" className="modal-content">
                    <div className="modal-header">
                    <center>
                        <h3 className="modal-title"><b>Add a student to {this.props.courseName} </b></h3>
                    </center>
                    <button id="modalClose" className="modal-close" onClick={this.handleCloseModal}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.handleCreateSubmit}>
                        <label>
                            Student ID:
                            <br/>
                            <input name="id" id="id" className="form-control form-center" type="text"
                                value={this.state.id} onChange={this.handleChange} ref={this.idRef}
                                placeholder="Student ID" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>
                            Display Name:
                            <br/>
                            <input name="displayName" id="displayName" className="form-control form-center" type="text"
                                value={this.state.displayName} onChange={this.handleChange} ref={this.displayNameRef}
                                placeholder="Course number" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <p></p>
                        <div className="modal-footer">
                            <button role="submit" id="saveStudent" className="btn btn-primary">
                            Create</button>
                            <button id="cancelStudent" className="btn btn-secondary" onClick={this.handleCloseModal}>
                            Cancel</button>
                        </div>
                        <br />
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddStudent;