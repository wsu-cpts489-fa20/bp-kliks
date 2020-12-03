// A modal to confirm deletion of a course

import React from 'react';
import AppMode from "./../../AppMode.js";

class DeleteCourse extends React.Component {
    constructor(props) {
        super(props);
    }

    // handles the modal closure
    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.COURSES);
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.deleteCourse(this.props.courseId);
    }

    render() {
        return (
            <div id="aboutModal" className="modal" role="dialog">
                <div id="ConfirmCourseDeleteModal" className="modal-content">
                    <div className="modal-header">
                    <center>
                        <h3 className="modal-title"><b>Are you sure you'd like to delete {this.props.courseName}?</b></h3>
                    </center>
                    <button id="modalClose" className="modal-close" onClick={this.handleCloseModal}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.handleDelete}>
                        <button role="submit" className="btn btn-primary">
                            Confirm</button>
                            <button className="btn btn-secondary" onClick={this.handleCloseModal}>
                            Cancel</button>
                        <br />
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteCourse;