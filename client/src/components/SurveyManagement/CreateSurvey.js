import React from 'react';
import FileUpload from './AnswerTypes/FileUpload';
import FreeResponse from './AnswerTypes/FreeResponse';
import MultipleChoice from './AnswerTypes/MultipleChoice';


const answerTypes = {};
answerTypes["multipleChoice"] = MultipleChoice;
answerTypes["shortAnswer"] = FreeResponse;
answerTypes["fileUpload"] = FileUpload;

class CreateSurvey extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor() {
        super();
        this.state = {
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

    render(){
        const AnswerType = answerTypes[this.state.answerType];
        return(
            <form className="padded-page" onSubmit={this.handleSubmit}>
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
          </form>            
        );
    }
}

export default CreateSurvey;