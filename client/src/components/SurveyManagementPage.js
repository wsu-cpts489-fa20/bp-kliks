import React from 'react';
import CreateSurvey from './SurveyManagement/CreateSurvey.js';
import ActiveQuestions from './SurveyManagement/ActiveQuestions.js'
import SubmittedResponse from './SurveyManagement/SubmittedResponse.js'
import AppMode from './../AppMode.js'
import SearchQestions from './SurveyManagement/SearchQuestions.js'
import CreateQuestion from './SurveyManagement/CreateQuestion.js';
import SearchSurveys from './SurveyManagement/SearchSurveys.js';

class SurveyManagementPage extends React.Component {
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

        // this.getQuestions();
    }

    //componentDidMount
    componentDidMount() {

        this.updateSurveys().then((value)=>{
            console.log("Success.");
        });
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
        Save a question to the mongoDB 
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
            // await this.getQuestions();
            this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH);
        } else {
            this.setState({errorMsg: ""});
            await this.updateSurveys();
            // await this.getQuestions();
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH);
        }
    }

    /*
        Edit a question to the mongoDB 
    */
    editQuestion = async (surveyId, updatedQuestion) => {
        const url = '/questions/' + surveyId + '/' + 
            this.props.userObj.questions[this.state.editId]._id;
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
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH);
        }
    }

    //deleteQuestion -- Delete the current user's question uniquely identified by
    //this.state.deleteId, delete from the database, and reset deleteId to empty.
    deleteQuestion = async () => {
        const url = '/questions/' + this.props.userObj.id + '/' + 
            this.props.userObj.entries[this.state.deleteId]._id;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'DELETE'
            //body: JSON.stringify()
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
            // await this.getQuestions();
            this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        } else {
            this.setState({errorMsg: ""});
            await this.updateSurveys();
            // await this.getQuestions();
            this.props.refreshOnUpdate(AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS);
        }
    }

    updateSurveys = async () => {
        var courses = [];
        courses = this.props.userObj.courses.map((course) => {
            return course.courseID;
        });
    
        if(courses.length == 0){
            courses = [""]
        }
        
        let response = await fetch("/all/surveys/" + JSON.stringify(courses), {method: 'GET'});
        if (response.status != 200) {
          let msg = await response.text();
          console.log("There was an error refreshing the user: " + msg);
          return;
        } 
        let surveys = await response.json();
        surveys = JSON.parse(surveys);
        console.log("refreshed Surveys");

        if(surveys.length == 0){
            this.setState({
                surveys: [],
                questions: [],
                responses: []
            });
            return;
        }

        var questions = this.seperateQuestions(surveys);
        var responses = this.seperateResponses(surveys);

        this.setState({
            surveys: surveys,
            questions: questions,
            responses : responses
        });
    }

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

    seperateResponses = (surveys) => {
        var responses = [];
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

    /* 
        Name: getQuestions
        Purpose: Gets all of the questions, surveys, and responses for the particular instructor.
    */     
    // getQuestions = async () => {

    //     var courses = [];
    //     courses = this.props.userObj.courses.map((course) => {
    //         return course.courseID;
    //     });

    //     if(courses.length == 0){
    //         courses = [""]
    //     }

    //     let response = await fetch("/responses/" + this.props.userObj.id+"/"+JSON.stringify(courses)); //["cpts489Fall2020"]
    
    //     if (response.status == 200) {
    //         response = await response.json();
    //         const obj = JSON.parse(response);    
        
    //         var getAllResponses = (questions) => {
    //             if(questions.length == 0){
    //               return [];
    //             }
            
    //             var responses = [];
    //             var newquestions = [];
    //             questions.forEach((survey) => {
    //               survey.questions.forEach((question) => {
    //                 newquestions.push({
    //                     questionID: question.questionID,
    //                     surveyID: survey.surveyID,
    //                     responses: question.responses,
    //                     survey: survey,
    //                     question: question
    //                   });
    //                 question.responses.forEach((response) => {
    //                     responses.push({
    //                       questionID: question.questionID,
    //                       surveyID: survey.surveyID,
    //                       response: response,
    //                       survey: survey,
    //                       question: question,
    //                       responseType: response.students.length > 1 ? "Group" : "Individual"
    //                     });
    //                 });
    //               });
    //             });
    //             return [responses, newquestions];
    //           }
    
    //         var data = getAllResponses(obj);
    //         this.setState({
    //           surveys : obj,
    //           questions : data[1],
    //           responses : data[0]
    //         });
    //     }
    // }

    setSurveyDelete = (survey) => {
        this.setState({
            surveyToDelete : survey
        });
    }

    deleteSurvey = async () => {
        console.log("Delete Survey");
        if(this.state.surveyToDelete == {}){
            console.log("There is no survey to delete.");
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
            console.log("Success deleting survey.");
            await this.updateSurveys();
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
                let thisEntry = {...this.props.userObj.questions[this.state.editId]}
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
                    setEditId={this.setEditId}
                    setDeleteId={this.setDeleteId}
                    deleteQuestion={this.deleteQuestion}
                    >
                    </SearchQestions>
                );
            case AppMode.SURVEY_MANAGEMENT_SEARCH_SURVEYS:
                return (
                    <SearchSurveys
                    surveys={this.state.surveys}
                    userObj={this.props.userObj}
                    updateSurveys={this.updateSurveys}
                    // getQuestions={this.getQuestions}
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
                    // getQuestions={this.getQuestions}
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