import React from 'react';
import FileUpload from './AnswerTypes/FileUpload';
import FreeResponse from './AnswerTypes/FreeResponse';
import MultipleChoice from './AnswerTypes/MultipleChoice';
import CreateQuestion from './CreateQuestion';
import AppMode from '../../AppMode';
import { v4 as uuid } from 'uuid';

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
            dropdownOfCourses : ""
        }     
    }

    handleChange = (event) => {
        const name = event.target.name; 
        this.setState({[name]: event.target.value}, this.checkDataValidity);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log("Create Survey");

        if(this.state.dropdownOfCourses.length == 0){
          console.log("Do not have a course selected!");
        }else{
          var newSurvey = {
            surveyTitle : this.state.surveyTitle,
            surveyDate : this.state.date,
            courseID : this.state.dropdownOfCourses
          };

          setTimeout(this.props.saveSurvey, 100, uuid(), newSurvey);
          this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        }
    }


    getCourses = () => {
      var courses = [];

      for(var index = 0; index < this.props.userObj.courses.length; index++)
      {
        const id = this.props.userObj.courses[index].courseSemester + "-"  + this.props.userObj.courses[index].courseYear +
        ": " + this.props.userObj.courses[index].courseName + "  " + this.props.userObj.courses[index].courseNumber;
        courses.push(<option id={id} value={id}>{id}</option>);
      }

      // let courses = this.props.userObj.courses.map((course) => {
      //   return {
      //     courseID : course.courseID,

      //   };
      // });
     return courses;
    }

    checkDataValidity = () => {
      console.log("CUSTOM VALIDITY");

      if(this.state.surveyTitle.length == 0){
          console.log("CUSTOM VALIDITY: surveyTitleRef");
          this.surveyTitleRef.current.setCustomValidity("Survey title missing.");
      }
      else{
          this.surveyTitleRef.current.setCustomValidity("");
      }

      if(this.state.dropdownOfCourses.length == 0){
          console.log("CUSTOM VALIDITY: surveyDateRef");
          this.courseSelectionRef.current.setCustomValidity("Course is missing for the survey.");
      }
      else{
          this.courseSelectionRef.current.setCustomValidity("");
      }

      let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
      if(this.state.date < today.toISOString().substr(0,10)){
          console.log("CUSTOM VALIDITY: surveyDate");
          this.surveyDateRef.current.setCustomValidity("Cannot create a survey for day in the past.");
      }
      else{
          this.surveyDateRef.current.setCustomValidity("");
      }        
  }    

    render(){
        return(
            <form className="padded-page" onSubmit={this.handleSubmit}>
            <center>
              <label>
                Survey Title:
                <input name="surveyTitle" className="form-control form-center"
                value={this.state.surveyTitle}
                onChange={this.handleChange}
                minLength={1}
                ref={this.surveyTitleRef}
                  type="text"/>
              </label>
              <p></p>
              <label>
                Date:
                <input name="date" className="form-control form-center" 
                  type="date" value={this.state.date} onChange={this.handleChange} 
                  ref={this.surveyDateRef}/>
              </label>
              <p></p>
            <p></p>
            <label>Course:
            <select name="dropdownOfCourses" value={this.state.dropdownOfCourses} 
              onChange={this.handleChange}
              required={true}
              ref={this.courseSelectionRef}
              className="form-control form-center">
                {this.getCourses()}
            </select> 
            </label>
            <p></p>
            <button type="submit" style={{width: "50%",fontSize: "36px"}}
            className="btn btn-primary btn-color-theme">
              <span className="fa fa-plus"/>&nbsp; Create survey
            </button>
            </center>
          </form>            
        );
    }
}

export default CreateSurvey;