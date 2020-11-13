import React from 'react';

class CreateSurvey extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor() {
        super();          
    }

    render(){
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
                    placeholder="Enter round notes" value={this.state.notes} 
                    />
                </label>
            <p></p>
            <p></p>
            <label>Answer Type:
            <select name="type" value={this.state.type} 
              className="form-control form-center">
              <option value="ShortAnswer">Short Answer</option>
              <option value="File">Multiple Choice</option>
              <option value="File">File Upload</option>
            </select> 
            </label>
            <p></p>
            <AnswerType>
                
            </AnswerType>
              <label>
                Question:
                <input name="course" className="form-control form-center" type="text"
                  value={this.state.course} onChange={this.handleChange}
                  placeholder="Course played" size="50" maxLength="50" />
              </label>
            <p></p>
            <button type="submit" style={{width: "70%",fontSize: "36px"}} 
              className="btn btn-primary btn-color-theme">
                <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
            </button>
            </center>
          </form>            
        );
    }
}

export default CreateSurvey;