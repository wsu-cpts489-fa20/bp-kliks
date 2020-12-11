// A modal to confirm deletion of a course

import React from 'react';
import AppMode from "./../../AppMode.js";

class DeleteStudent extends React.Component {
    constructor(props) {
        super(props);
    }

    // handles the modal closure
    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.STUDENTS);
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.deleteStudent();
        this.props.changeMode(AppMode.STUDENTS);
    }

    render() {
        return (
            <div id="aboutModal" className="modal" role="dialog">
                <div id="ConfirmStudentDeleteModal" className="modal-content">
                    <div className="modal-header">
                    <center>
                        <h3 className="modal-title"><b>Are you sure you'd like to delete {this.props.studentName}?</b></h3>
                    </center>
                    <button id="modalClose" className="modal-close" onClick={this.handleCloseModal}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.handleDelete}>
                        <button role="submit" className="btn btn-primary delete-student">
                            Confirm</button>
                            <button className="btn btn-secondary cancel-delete-student" onClick={this.handleCloseModal}>
                            Cancel</button>
                        <br />
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteStudent;