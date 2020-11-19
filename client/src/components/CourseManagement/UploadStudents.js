import React from 'react';
import AppMode from '../../AppMode';

class UploadStudents extends React.Component {
    constructor(props) {
        super(props);

        this.rosterRef = React.createRef();

        this.state = {
            rosterFile: "",
        }
    }

    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.STUDENTS);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div id="aboutModal" className="modal" role="dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <center>
                        <h3 className="modal-title"><b>Upload Students</b></h3>
                    </center>
                    <button id="modalClose" className="modal-close" onClick={this.handleCloseModal}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                    <p>Add multiple students to this course at once by using uploading a class roster CSV file.<br />
                    </p>
                    <form onSubmit={this.props.uploadStudents}>
                        <label>
                            Select a Roster File:
                            <br/>
                            <input
                            className="form-control form-text form-center"
                            name="roster"
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            required={true}
                            ref={this.rosterRef}
                            value={this.state.rosterFile}
                            onChange={this.handleChange}
                            />
                        </label>
                        <div className="modal-footer">
                            <button role="submit" className="btn btn-primary">
                            Upload</button>
                            <button className="btn btn-secondary" onClick={this.handleCloseModal}>
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

export default UploadStudents;