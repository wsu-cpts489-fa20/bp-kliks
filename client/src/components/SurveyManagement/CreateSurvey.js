import React from 'react';
import FileUpload from './AnswerTypes/FileUpload';
import FreeResponse from './AnswerTypes/FreeResponse';
import MultipleChoice from './AnswerTypes/MultipleChoice';
import CreateQuestion from './CreateQuestion';
import AppMode from '../../AppMode';

const answerTypes = {};
answerTypes["multipleChoice"] = MultipleChoice;
answerTypes["shortAnswer"] = FreeResponse;
answerTypes["fileUpload"] = FileUpload;

class CreateSurvey extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);

        this.courseSelectionRef = React.createRef();
        this.surveyTitleRef = React.createRef();
        this.surveyDateRef = React.createRef();

        //Create date object for today, taking time zone into consideration
        let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);

        this.state = {
            answerType : "shortAnswer",
            question: "",
            addSurvey: false,
            surveyTitle : "",
            date: today.toISOString().substr(0,10),
            dropdownOfCourses : this.props.userObj.courses.length > 0 ? (this.props.userObj.courses[0].courseSemester + "-"  + this.props.userObj.courses[0].courseYear +
            ": " + this.props.userObj.courses[0].courseName + "  " + this.props.userObj.courses[0].courseNumber) : "",
            courseID: this.props.userObj.courses.length > 0 ? this.props.userObj.courses[0].courseID : "" 
        }     
    }

    // Handles any change that has been made
    handleChange = (event) => {
        const name = event.target.name; 
        this.setState({[name]: event.target.value}, this.checkDataValidity);
    }

    // Handles creation of the new Survey
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.dropdownOfCourses.length == 0){
        }else{
          var newSurvey = {
            surveyTitle : this.state.surveyTitle,
            surveyDate : this.state.date,
            courseID : this.state.courseID
          };

          setTimeout(this.props.saveSurvey, 1000, "efr423f" /* Random string, is changed in the route. */, newSurvey);
          // this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        }
    }

    // Gets the courses for the dropdown
    getCourses = () => {
      var courses = [];

      for(var index = 0; index < this.props.userObj.courses.length; index++)
      {
        const id = this.props.userObj.courses[index].courseSemester + "-"  + this.props.userObj.courses[index].courseYear +
        ": " + this.props.userObj.courses[index].courseName + "  " + this.props.userObj.courses[index].courseNumber;
        courses.push(<option id={this.props.userObj.courses[index].courseID} value={this.props.userObj.courses[index].courseID}>{id}</option>);
      }

     return courses;
    }

    // Handles the change for the dropdown option
    handleDropdownChange = (event) => {
      const name = event.target.name; 
      this.setState({[name]: event.target.value,
        courseID : event.target.value
      }, this.checkDataValidity);
    }

    // Checks that the data elements are filled and with the correct information.
    checkDataValidity = () => {
      if(this.state.surveyTitle.length == 0){
          this.surveyTitleRef.current.setCustomValidity("Survey title missing.");
      }
      else{
          this.surveyTitleRef.current.setCustomValidity("");
      }

      if(this.state.dropdownOfCourses == ""){
          this.courseSelectionRef.current.setCustomValidity("Course is missing for the survey.");
      }
      else{
          this.courseSelectionRef.current.setCustomValidity("");
      }

      let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
      if(this.state.date < today.toISOString().substr(0,10)){
          this.surveyDateRef.current.setCustomValidity("Cannot create a survey for day in the past.");
      }
      else{
          this.surveyDateRef.current.setCustomValidity("");
      }        
  }    

    render(){
        return(
            <form className="padded-page" id={"createSurvey-page"} onSubmit={this.handleSubmit}>
            <center>
              <label>
                Survey Title:
                <input name="surveyTitle" 
                id={"createSurvey-title"}
                className="form-control form-center"
                value={this.state.surveyTitle}
                onChange={this.handleChange}
                minLength={1}
                ref={this.surveyTitleRef}
                  type="text"/>
              </label>
              <p></p>
              <label>
                Date:
                <input name="date" 
                  id={"createSurvey-date"}
                  className="form-control form-center" 
                  type="date" value={this.state.date} onChange={this.handleChange} 
                  ref={this.surveyDateRef}/>
              </label>
              <p></p>
            <p></p>
            <label>Course:
            <select name="dropdownOfCourses" value={this.state.dropdownOfCourses} 
              onChange={this.handleDropdownChange}
              onBlur={this.handleDropdownChange}
              id={this.state.courseID}
              defaultValue={this.state.dropdownOfCourses}
              required={true}
              ref={this.courseSelectionRef}
              className="form-control form-center">
                {this.getCourses()}
            </select> 
            </label>
            <p></p>
            <button type="submit" 
              id={"createSurvey-creatBtn"}
              style={{width: "50%",fontSize: "36px"}}
              className="btn btn-primary btn-color-theme">
              <span className="fa fa-plus"/>&nbsp; Create survey
            </button>
            </center>
          </form>            
        );
    }
}

export default CreateSurvey;