// A modal for adding a student to an existing course
// Only an instructor can do this

import React from 'react';
import AppMode from "./../../AppMode.js";

class EditStudent extends React.Component {
    constructor(props) {
        super(props);

        this.idRef = React.createRef();
        this.displayNameRef = React.createRef();

        this.state = {
            originalId: "",
            id: "",
            displayName: "",
        };
    }

    //componentDidMount -- grab the course data from the database and push them into the state.
    async componentDidMount() {

        this.setState({
            originalId: this.props.id,
            id: this.props.id,
            displayName: this.props.displayName
        });
}

    // handles the modal closure
    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.STUDENTS);
    }

    // handles create button click
    handleEditSubmit = (event) => {
        event.preventDefault();

        const newStudent = {
            userID: this.state.id,
            studentDisplayName: this.state.displayName,
        };

        this.props.editStudent(newStudent, this.state.originalId);
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
                <div id="EditStudentModal" className="modal-content">
                    <div className="modal-header">
                    <center>
                        <h3 className="modal-title"><b>Edit {this.props.id} </b></h3>
                    </center>
                    <button id="modalClose" className="modal-close" onClick={this.handleCloseModal}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.handleEditSubmit}>
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
                            Edit</button>
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

export default EditStudent;