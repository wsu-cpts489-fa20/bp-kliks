import React from 'react';
import FileUpload from './AnswerTypes/FileUpload';
import FreeResponse from './AnswerTypes/FreeResponse';
import MultipleChoice from './AnswerTypes/MultipleChoice';
import AppMode from '../../AppMode';


const answerTypes = {};
answerTypes["multipleChoice"] = MultipleChoice;
answerTypes["shortAnswer"] = FreeResponse;
answerTypes["fileUpload"] = FileUpload;

class CreateQuestion extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
        this.state = {
            numberOfSurveys : this.props.surveys.length,
            answerType : "shortAnswer",
            question: ""
        }     
    }

    handleChange = (event) => {
        const name = event.target.name; 
        this.setState({[name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Create Question");
    }

    onAddSurvey = (event) => {
        event.preventDefault();

        this.props.changeMode(AppMode.SURVEY_MANAGEMENT_CREATE_SURVEY)
        // this.setState({
        //   addSurvey : !this.state.addSurvey
        // });
    }    

    render(){
        const AnswerType = answerTypes[this.state.answerType];
        return(
            <form className="padded-page" onSubmit={this.handleSubmit}>
                {
                this.state.numberOfSurveys == 0 ?
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
                        <label>
                            Question Title:
                            <input name="title" className="form-control form-center" 
                            type="text"/>
                        </label>
                        <p></p>
                            <label>Question:
                                <textarea name="question" className="form-control" rows="6" cols="75" 
                                placeholder="Enter Question here" value={this.state.question} 
                                />
                            </label>
                        <p></p>
                        <p></p>
                        <label>Answer Type:
                        <select name="answerType" value={this.state.answerType} onChange={this.handleChange} 
                        className="form-control form-center">
                        <option value="shortAnswer">Short Answer</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="fileUpload">File Upload</option>
                        </select> 
                        </label>
                        <p></p>
                        <AnswerType>

                        </AnswerType>
                        <p></p>
                        <button type="submit" style={{width: "70%",fontSize: "36px"}} 
                        className="btn btn-primary btn-color-theme">
                            <span className="fa fa-plus"/>&nbsp; Create Question
                        </button>
                    </center>
                )
                }
          </form>
        );
    }
}

export default CreateQuestion;