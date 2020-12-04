import React from 'react';
import FileUpload from './AnswerTypes/FileUpload';
import FreeResponse from './AnswerTypes/FreeResponse';
import MultipleChoice from './AnswerTypes/MultipleChoice';
import AppMode from '../../AppMode';
import { v4 as uuid } from 'uuid';
import Switch from 'react-input-switch';


const answerTypes = {};
answerTypes["multipleChoice"] = MultipleChoice;
answerTypes["shortAnswer"] = FreeResponse;
answerTypes["fileUpload"] = FileUpload;

class CreateQuestion extends React.Component {
    //  constructor
    constructor(props) {
        super(props);

        let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
        this.questionTextRef = React.createRef();
        this.questionTitleRef = React.createRef();
        this.surveySelectionRef = React.createRef();
        this.dateRef = React.createRef();
        
        if (this.props.mode == AppMode.SURVEY_MANAGEMENT_CREATE)
        {
            this.state = {
                dropdownOfSurveys : this.props.surveys.length > 0 ? this.props.surveys[0].surveyID : "",
                numberOfSurveys : this.props.surveys.length,
                date: today.toISOString().substr(0,10),
                answerType : "shortAnswer",
                question: "",
                title : "",
                answers : [],
                active : false,
                acceptableAnswerTypes : [],
                surveyID : this.props.surveys.length > 0 ? this.props.surveys[0].surveyID : "" ,
                submitIcon = "fa fa-save",
                submitLabel = "Save Question"
            }    
        } 
        else
        {
            this.state.dropdownOfSurveys = this.props.surveys.length > 0 ? this.props.surveys[0].surveyID : "",
            this.state.numberOfSurveys = this.props.surveys.length,
            this.state = this.props.startData;
            this.state.surveyID = this.props.surveys.length > 0 ? this.props.surveys[0].surveyID : "" ,
            this.state.submitIcon = "fa fa-edit";
            this.state.submitLabel = "Update Question";
        }
    }


    // On change handler for the form elements
    handleChange = (event) => {
        const name = event.target.name; 
        this.setState({[name]: event.target.value}, this.checkDataValidity);
    }

    // Event handler for when the user clicks on Add Survey
    handleSubmit = (event) => {
        event.preventDefault();
        var newQuestion = {
            questionID: uuid(),
            questionTitle: this.state.title,
            questionText: this.state.question,
            questionType: this.state.answerType,
            questionAnswers:this.state.answers,
            acceptableAnswerTypes: this.state.acceptableAnswerTypes,
            questionActive: this.state.active,
            responses:  []
        }

        setTimeout(this.props.saveQuestion, 100, this.state.surveyID, newQuestion);
        this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH);
    }

    // Handles when the user clicks on add survey [If there are no sureys]
    onAddSurvey = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.SURVEY_MANAGEMENT_CREATE_SURVEY)
    }

    // Sets the acceptable types for the file type [if the answer has to be a file upload]
    setAcceptableAnswerTypes = (newTypes) => {
        this.setState({
            acceptableAnswerTypes: newTypes
        });
    }

    // Creates the dropdown options [Surveys] 
    getSurveys = () => {
        var surveys = [];
  
        for(var index = 0; index < this.props.surveys.length; index++)
        {
          surveys.push(<option name={this.props.surveys[index].surveyID} key={this.props.surveys[index].surveyID} id={this.props.surveys[index].surveyID} value={this.props.surveys[index].surveyID}>{this.props.surveys[index].surveyTitle}</option>);
        }

       return surveys;
    }

    // sets the value of the answer
    setAnswer = (newAnswer) => {
        this.setState({
            answers : newAnswer
        });
    }

    // Handles the change event for the switch button
    switchHandler = () => {
        this.setState({
            active : !this.state.active
        });
    }

    // Handles the changes that occur to the dropdown menu 
    handleDropdownChange = (event) => {
        const name = event.target.name; 
        this.setState({[name]: event.target.value,
          surveyID : event.target.value
        }, this.checkDataValidity);        
    }

    // data validator for the form elements
    checkDataValidity = () => {
        if(this.state.dropdownOfSurveys == ""){
            this.surveySelectionRef.current.setCustomValidity("No Survey selected.");
        }
        else{
            this.surveySelectionRef.current.setCustomValidity("");
        }

        if(this.state.question.length == 0){
            this.questionTextRef.current.setCustomValidity("Question does not have a any text.");
        }
        else{
            this.questionTextRef.current.setCustomValidity("");
        }

        if(this.state.title.length == 0){
            this.questionTitleRef.current.setCustomValidity("Question does not have a title.");
        }
        else{
            this.questionTitleRef.current.setCustomValidity("");
        }

        let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
        if(this.state.date < today.toISOString().substr(0,10)){
            this.dateRef.current.setCustomValidity("Cannot create a question for the past.");
        }
        else{
            this.dateRef.current.setCustomValidity("");
        }        
    }

    render(){
        const AnswerType = answerTypes[this.state.answerType];
        return(
            <form className="padded-page" onSubmit={this.handleSubmit}>
                {
                this.props.surveys.length == 0 ?
                <center>
                    <p></p>
                    <p>There are no surveys, please create surveys in order to create questions </p>
                    <p></p>
                    <button type="button" style={{width: "50%",fontSize: "36px"}} onClick={this.onAddSurvey}
                    className="btn btn-primary btn-color-theme">
                        <span className="fa fa-plus"/>&nbsp; Add a survey
                    </button>
                </center>
                :
                (
                    <center>
                        <label
                        style={{fontSize: "20px"}}
                        >
                            Question Title:
                            <input name="title" className="form-control form-center" value={this.state.title} onChange={this.handleChange}
                            ref={this.questionTitleRef}
                            minLength={1}
                            type="text"/>
                        </label>
                        <p></p>
                            <label
                                style={{fontSize: "20px"}}
                            >Question:
                                <textarea name="question" className="form-control" rows="6" cols="75" 
                                placeholder="Enter Question here" value={this.state.question}
                                ref={this.questionTextRef}
                                minLength={1}
                                onChange={this.handleChange}
                                />
                            </label>
                        <p></p>
                        <label
                            style={{fontSize: "20px"}}
                        >
                            Date:
                            <input name="date" className="form-control form-center" 
                            type="date" value={this.state.date} onChange={this.handleChange}
                            ref={this.dateRef}
                            />
                        </label>
                        <p></p>                        
                        <label
                            style={{fontSize: "20px"}}
                        >Survey:
                        <select name="dropdownOfSurveys"
                            id={"dropdownOfSurveys"}
                            value={this.state.dropdownOfSurveys}
                            onChange={this.handleDropdownChange}
                            onBlur={this.handleDropdownChange}
                            className="form-control form-center"
                            ref={this.surveySelectionRef}
                            required={true}
                        >
                            {this.getSurveys()}
                        </select> 
                        </label>
                        <p></p>
                        <label style={{fontSize: "20px"}}>
                            Activate Question after Creation:
                            <p></p>
                            <label className="switch"><input type={"checkbox"} id={"togBtn"} onClick={this.switchHandler}/>
                                <div className="slider round">
                                <span className="on" style={{textAlign:"left"}}>YES</span><span className="off"  style={{textAlign:"right"}}>NO</span>
                                </div>
                            </label>
                        </label>
                        <p></p>
                        <label
                            style={{fontSize: "20px"}}
                        >Answer Type:
                        <select name="answerType" value={this.state.answerType} onChange={this.handleChange} 
                        className="form-control form-center">
                        <option value="shortAnswer">Short Answer</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="fileUpload">File Upload</option>
                        </select> 
                        </label>
                        <p></p>
                        <AnswerType
                            setAnswer={this.setAnswer}
                            setAcceptableAnswerTypes={this.setAcceptableAnswerTypes}
                        >
                        </AnswerType>
                        <p></p>
                        <button type="submit" style={{width: "70%",fontSize: "36px"}} 
                        className="btn btn-primary btn-color-theme">
                            <span className={this.state.submitIcon}/>&nbsp; {this.state.submitLabel}
                        </button>
                    </center>
                )
                }
          </form>

        );
    }
}  

export default CreateQuestion;