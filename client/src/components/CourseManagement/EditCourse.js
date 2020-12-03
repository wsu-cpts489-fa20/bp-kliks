// A modal component that instructors use to create new courses

import React from 'react';
import AppMode from "./../../AppMode.js";

class EditCourse extends React.Component {
    constructor(props) {
        super(props);

        this.numberRef = React.createRef();
        this.semesterRef = React.createRef();
        this.yearRef = React.createRef();

        this.state = {
            name: "",
            number: "",
            id: "",
            semester: "",
            year: "",
            instructorFirstName: "",
            instructorLastName: "",
            enrollmentLimit: "",
            currentlyEnrolled: "",
            notes: "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    //componentDidMount -- grab the course data from the database and push them into the state.
    async componentDidMount() {
            //obtain current course data from database and push into state
            const url = "/courses/" + this.props.userId;
            const res = await fetch(url);
            const json = await res.json();
            const userData = JSON.parse(json);

            let currCourse = userData.filter(function (course) {
                return course.courseID === this.props.courseId;
            }.bind(this))

            currCourse = currCourse[0];

            this.setState({
                instructorFirstName: currCourse.courseInstructorFirstName,
                instructorLastName: currCourse.courseInstructorLastName,
                name: currCourse.courseName,
                number: currCourse.courseNumber,
                year: currCourse.courseYear,
                semester: currCourse.courseSemester,
                enrollmentLimit: currCourse.courseEnrollmentLimit,
                currentlyEnrolled: currCourse.courseCurrentlyEnrolled,
                id: currCourse.courseID,
                notes: currCourse.courseNotes
            });
    }

    // handles the modal closure
    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.COURSES);
    }

    // handles create button click
    handleEditSubmit = (event) => {
        event.preventDefault();

        const newCourse = {
            courseInstructorFirstName: this.state.instructorFirstName,
            courseInstructorLastName: this.state.instructorLastName,
            courseInstructorID: this.props.instructorId,
            courseName: this.state.name,
            courseNumber: this.state.number,
            courseYear: this.state.year,
            courseSemester: this.state.semester,
            courseEnrollmentLimit: this.state.enrollmentLimit,
            courseCurrentlyEnrolled: this.state.currentlyEnrolled,
            courseID: this.state.id,
            courseNotes: this.state.notes
        };

        this.props.editCourse(newCourse);
        this.props.changeMode(AppMode.COURSES);
    }

    // called everytime a field in the form changes value
    handleChange = (event) => {
        const name = event.target.name;

        // Update the courseID if number, semester, or year has changed
        if (name === "number" || name === "semester" || name === "year"){
            let newCourseId = this.numberRef.current.value + this.semesterRef.current.value + this.yearRef.current.value;
            this.setState({id : newCourseId});
        }

        this.setState({[name]: event.target.value});
    }
    

    render() {
        return (
            <div id="aboutModal" className="modal" role="dialog">
                <div id="AddCourseModal" className="modal-content">
                    <div className="modal-header">
                    <center>
                        <h3 className="modal-title"><b>Edit {this.props.courseName}</b></h3>
                    </center>
                    <button id="modalClose" className="modal-close" onClick={this.handleCloseModal}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.handleEditSubmit}>
                        <label>
                            Course Name:
                            <br/>
                            <input name="name" className="form-control form-center" type="text"
                                value={this.state.name} onChange={this.handleChange}
                                placeholder="Course name" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>
                            Course Number:
                            <br/>
                            <input name="number" className="form-control form-center" type="text"
                                value={this.state.number} onChange={this.handleChange} ref={this.numberRef}
                                placeholder="Course number" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>
                            Term:
                            <br/>
                            <input name="semester" className="form-control form-center" type="text"
                                value={this.state.semester} onChange={this.handleChange} ref={this.semesterRef}
                                placeholder="Current term" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>
                            Year:
                            <br/>
                            <input name="year" className="form-control form-center" type="text"
                                value={this.state.year} onChange={this.handleChange} ref={this.yearRef}
                                placeholder="Current year" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>
                            Instructor First Name:
                            <br/>
                            <input name="instructorFirstName" className="form-control form-center" type="text"
                                value={this.state.instructorFirstName} onChange={this.handleChange}
                                placeholder="First name" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>
                            Instructor Last Name:
                            <br/>
                            <input name="instructorLastName" className="form-control form-center" type="text"
                                value={this.state.instructorLastName} onChange={this.handleChange}
                                placeholder="Last name" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>
                            Enrollment Limit:
                            <br/>
                            <input name="enrollmentLimit" className="form-control form-center" type="text"
                                value={this.state.enrollmentLimit} onChange={this.handleChange}
                                placeholder="Enrollment limit" size="50" maxLength="50" required={true}/>
                        </label>
                        <p></p>
                        <label>Notes:
                            <textarea name="notes" className="form-control" rows="6" cols="75" 
                                placeholder="Enter course notes" value={this.state.notes} 
                                onChange={this.handleChange} />
                        </label>
                        <p></p>
                        <p></p>
                        <div className="modal-footer">
                            <button role="submit" className="btn btn-primary">
                            Edit</button>
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

export default EditCourse;