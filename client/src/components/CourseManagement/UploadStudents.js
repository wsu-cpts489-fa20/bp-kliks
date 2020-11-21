// A modal component that has a file input that accepts only .csv files of a class roster

import React from 'react';
import AppMode from '../../AppMode';

class UploadStudents extends React.Component {
    constructor(props) {
        super(props);

        this.rosterRef = React.createRef();
        this.fileReadingFinished = this.fileReadingFinished.bind(this);

        this.state = {
            roster: [],
        }
    }

    // handles the modal closure
    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.STUDENTS);
    }

    // handles when a new file is chosen
    handleFile = (files) => {
        if (window.FileReader) {
            // FileReader are supported.
            this.getAsText(this.rosterRef.current.files[0]);
        }
    }

    // handles upload button click
    handleUploadSubmit = (event) => {
        event.preventDefault();
        this.props.uploadStudents(this.state.roster);
        this.props.changeMode(AppMode.STUDENTS);
    }

    // reades the file as a string
    getAsText(fileToRead) {
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(fileToRead);
        // Handle errors load
        reader.onload = this.fileReadingFinished;
        reader.onerror = this.errorHandler;
    }

    // processes the file and extracts data
    fileReadingFinished(event) {
        var csv = event.target.result;
        var allTextLines = csv.split(/\r\n|\n/);

        // remove header entry and blank entries
        allTextLines = allTextLines.filter(function (student) {
            return student !== "userID,displayName" && student !== "";
        })
        var lines = allTextLines.map(data => data.split(';'));
        
        // split each string into two array elements
        lines = lines.map(function(val, index) {
            val = val[0].split(',');
            return val;
        });

        this.setState({roster : lines});
    }

    // handles erros when uploading a file
    errorHandler(event) {
        if (event.target.error.name === "NotReadableError") {
            alert("Cannot read file!");
        }
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
                    <p>Add multiple students to this course at once by using uploading a class roster CSV file. 
                        Each student entry needs a userID and DisplayName column.<br />
                    </p>
                    <form onSubmit={this.handleUploadSubmit}>
                        <label>
                            Select a Roster File:
                            <br/>
                            <input
                            className="form-control form-text form-center"
                            name="roster"
                            type="file"
                            accept=".csv"
                            required={true}
                            ref={this.rosterRef}
                            value={this.state.rosterFileName}
                            onChange={this.handleFile}
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