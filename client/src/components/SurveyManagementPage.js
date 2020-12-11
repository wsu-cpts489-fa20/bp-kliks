// Main manage surveyManagement page
// From here an instructor can CreateQuestions, CreateSurveys, SearchSurveys, View Active questions, search for questions, and view all
// of the responses that students made.

import React from 'react';
import CreateSurvey from './SurveyManagement/CreateSurvey.js';
import ActiveQuestions from './SurveyManagement/ActiveQuestions.js'
import SubmittedResponse from './SurveyManagement/SubmittedResponse.js'
import AppMode from './../AppMode.js'
import SearchQestions from './SurveyManagement/SearchQuestions.js'
import CreateQuestion from './SurveyManagement/CreateQuestion.js';
import SearchSurveys from './SurveyManagement/SearchSurveys.js';

class SurveyManagementPage extends React.Component {

    // Constructor for the component that takes in the props and sets the state of the component.
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            responses: [],
            surveys : [],
            errorMsg : "",
            deleteId: "",
            editId: "",
            surveyToDelete : {}
        };
    }

    //componentDidMount
    componentDidMount() {
        this.updateSurveys();
    }

    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val) => {
        this.setState({deleteId: val});
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.setState({editId: val});
    }

    /*
        Save a question to the mongoDB by calling the POST route for questions
    */
    saveQuestion = async (surveyId, newQuestion) => {
        const url = '/questions/' + surveyId;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(newQuestion)});
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH);
        } else {
            this.setState({errorMsg: ""});
            await this.updateSurveys();
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH);
        }
    }

    /*
        Edit a question to the mongoDB by calling the PUT route for questions
    */
    editQuestion = async (surveyId, updatedQuestion) => {
        const url = '/questions/' + surveyId + '/' + 
            this.questions[this.state.editId].questionID;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(updatedQuestion)}); 
        const msg = await res.text();
        if (res.status != 200) {
            alert("An error occurred when attempting to update the question to database: " 
            + msg);
            this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH);
        } else {
            console.log("Question Updated!");
            await this.updateSurveys();
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH);
        }
    }

    //deleteQuestion -- Delete the current user's question uniquely identified by
    //this.state.deleteId, delete from the database, and reset deleteId to empty.
    deleteQuestion = async () => {
        // Make a request to the questions DELETE route to remove the question.
        const url = '/questions/' + this.props.userObj.id + '/' + 
            this.questions[this.state.deleteId].questionID;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'DELETE'
        }); 
        const msg = await res.text();
        if (res.status != 200) {
            alert("An error occurred when attempting to delete question in database: " 
            + msg);
            this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH);
        } else {
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH);
        }
    }

    /*
        Save a survey to the mongoDB 
    */
    saveSurvey = async (surveyID, newSurvey) => {
        // Make a request to the surveys POST route to add the survey.        
        const url = '/surveys/' + surveyID;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(newSurvey)}); 
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        } else {
            this.setState({errorMsg: ""});
            await this.updateSurveys(); //call update to update the array state variables.
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        }
    }

    // Updates surveys like the updateUser except for Surveys
    updateSurveys = async () => {
        var courses = [];
        courses = this.props.userObj.courses.map((course) => {
            return course.courseID;
        });
    
        // Checks if there are courses, if there are no courses send we just send an array with an empty string.
        if(courses.length == 0){
            courses = [""]
        }
        
        // Make a request to get the surveys
        let response = await fetch("/all/surveys/" + JSON.stringify(courses), {method: 'GET'});
        if (response.status != 200) {
          let msg = await response.text();
          console.log("There was an error refreshing the user: " + msg);
          return;
        } 
        let surveys = await response.json();
        surveys = JSON.parse(surveys);

        // If we get back nothing then we can set the state to empty arrays
        if(surveys.length == 0){
            this.setState({
                surveys: [],
                questions: [],
                responses: []
            });
            return;
        }

        var questions = this.seperateQuestions(surveys); // Get all of the questions.
        var responses = this.seperateResponses(surveys); // Get all of the responses.

        // Udpate the surveys, questions, and responses.
        this.setState({
            surveys: surveys,
            questions: questions,
            responses : responses
        });
    }

    // Gets the questions from the surveys that were just retrieved 
    seperateQuestions = (surveys) => {
        var questions = [];
        surveys.forEach((survey)=>{
            survey.questions.forEach((question)=> {
                questions.push(
                    {
                        questionID: question.questionID,
                        surveyID: survey.surveyID,
                        responses: question.responses,
                        survey: survey,
                        question: question,
                    });
            });
        });

        return questions;
    }

    // Gets the responses from the surveys that were just retrieved 
    seperateResponses = (surveys) => {
        var responses = [];
        // Run through all of the surveys and questions then the responses and begin to push them into the responses object.
        surveys.forEach((survey)=>{
            survey.questions.forEach((question)=> {
                question.responses.forEach((response) => {
                    responses.push({
                            questionID: question.questionID,
                            surveyID: survey.surveyID,
                            response: response,
                            survey: survey,
                            question: question,
                            responseType: response.students.length > 1 ? "Group" : "Individual"
                        });
                    });
                });
            });
        return responses;        
    }

    // Sets the survey that is going to be delete.
    setSurveyDelete = (survey) => {
        // Setting the unique identifier that will be delete [The survey itself.]
        this.setState({
            surveyToDelete : survey
        });
    }

    // Delete Surveys by calling the DELETE route for SURVEYS
    deleteSurvey = async () => {
        if(this.state.surveyToDelete == {}){
            return;
        }

        const url = '/surveys/' + this.state.surveyToDelete.surveyID;
        const res = await fetch(url, {method: 'DELETE'}); 
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: "An error occurred when attempting to delete survey from MongoDB: " 
            + msg});
            this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        } else {
            await this.updateSurveys(); // here, we want to update the surveys after this call.
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        }
    }

    render() {
        switch(this.props.mode) {
            case AppMode.SURVEY_MANAGEMENT:
                return (
                    <>
                    <ActiveQuestions>
                    </ActiveQuestions>
                    </>
                );
            case AppMode.SURVEY_MANAGEMENT_CREATE:
                return (
                    <CreateQuestion
                    userObj={this.props.userObj}
                    surveys={this.state.surveys}
                    mode={this.props.mode}
                    changeMode={this.props.changeMode}
                    saveQuestion={this.saveQuestion}
                    >
                    </CreateQuestion>
                );
            case AppMode.SURVEY_MANAGEMENT_EDIT:
                let thisEntry = {...this.questions[this.state.editId]}
                thisEntry.date = thisEntry.date.substr(0,10);
                return (
                    <CreateQuestion
                    startData={thisEntry}
                    surveys={this.state.surveys}
                    mode={this.props.mode}
                    changeMode={this.props.changeMode}
                    saveQuestion={this.saveQuestion}
                    editQuestion={this.editQuestion}
                    >
                    </CreateQuestion>
                );
            case AppMode.SURVEY_MANAGEMENT_CREATE_SURVEY:
                return (
                    <CreateSurvey 
                    userObj={this.props.userObj}
                    surveys={this.state.surveys}
                    changeMode={this.props.changeMode}
                    saveSurvey={this.saveSurvey}
                    >
                    </CreateSurvey>
                );
            case AppMode.SURVEY_MANAGEMENT_SEARCH:
                return (
                    <SearchQestions
                    menuOpen={this.props.menuOpen}
                    setEditId={this.setEditId}
                    setDeleteId={this.setDeleteId}
                    deleteQuestion={this.deleteQuestion}
                    questions={this.state.questions}
                    >
                    </SearchQestions>
                );
            case AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS:
                return (
                    <SearchSurveys
                    surveys={this.state.surveys}
                    userObj={this.props.userObj}
                    updateSurveys={this.updateSurveys}
                    menuOpen={this.props.menuOpen}
                    setSurveyDelete={this.setSurveyDelete}
                    deleteSurvey={this.deleteSurvey}
                    >
                    </SearchSurveys>
                );
            case AppMode.SURVEY_MANAGEMENT_RESPONSES:
                return (
                    <SubmittedResponse
                    userObj={this.props.userObj}
                    updateResponses={this.updateSurveys}
                    questions={this.state.questions}
                    responses={this.state.responses}
                    menuOpen={this.props.menuOpen}
                    >
                    </SubmittedResponse>
                );
        }
    }   
}

export default SurveyManagementPage;