import React from 'react';

class MultipleChoice extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
        this.state = {
          answers : [
                    {
                      placeholder: "",
                      name: 0,
                      value : "",
                      id : 0
                    }
                  ]
        };
    }

    // Handles the event when the user clicks on addAnswer
    onAddAnswer = (event) => {
      event.preventDefault();
      var answers = this.state.answers;

      answers.push(
        {
          placeholder: answers.length,
          name: answers.length,
          value : "",
          id: answers.length
        }
      );

      this.setState({
        answers : answers
      });

      let strAnswers = answers.map((element) => {
        return element.value;
      });      

      this.props.setAnswer(strAnswers);
    }

    // Handles the event when the user clicks on removeAnswer
    onRemoveAnswer = (event) => {
      event.preventDefault();
      var answers = this.state.answers;

      if(answers.length > 0)
      {
        answers.pop();
  
        this.setState({
          answers : answers
        });

        let strAnswers = answers.map((element) => {
          return element.value;
        });

        this.props.setAnswer(strAnswers);
      }else{
        this.props.setAnswer([""]);
      }
    }

    // Gets the answers and creates input elements for them
    getAnswers = () => {
      var answers = [];

      for(var index = 0; index < this.state.answers.length; index++){
        answers.push(
          <input id={index+"-mcOption"} placeholder="Input answer..." onChange={this.onAnswerTextChange} value={this.state.answers[index].value} name={this.state.answers[index].name} aria-label="Username" aria-describedby="basic-addon1" className="form-control"/>
        );
      }
      return answers;
    }

    // Handles the text change of the input elements
    onAnswerTextChange = (event) => {
      var answers = this.state.answers;

      answers[Number(event.target.name)].value = event.target.value;

      let strAnswers = answers.map((element) => {
        return element.value;
      });

      this.props.setAnswer(strAnswers);
      this.setState({
        answers : answers
      });
    }
    
    render(){
        return(
            <div>
            <center>
            <div className="mb-3 input-group" style={{width:"20%"}}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Answer choice</span>
              </div>
              <div id={"multiple-choice-option-answers"}>
                {
                  this.getAnswers()
                }
              </div>
            </div>
            <p></p>
            
            <div className="row justify-content-center">
                <div className="col-md-3" style={{width: "40%"}}>
                  <button type="button" style={{fontSize: "28px"}} 
                  id={"createQuestion-mc-addAnswerBtn"}
                  onClick={this.onAddAnswer} 
                    className="btn btn-primary btn-color-theme">
                      <span className="fa fa-plus"/>&nbsp;Add Answer
                  </button>
                </div>
                <div className="col-md-3" style={{width: "40%"}}>
                  <button  type="button" style={{fontSize: "28px"}} 
                  id={"createQuestion-mc-removeAnswerBtn"}
                  onClick={this.onRemoveAnswer} 
                    className="btn btn-primary btn-color-theme">
                      <span className="fa fa-plus"/>&nbsp;Remove Answer
                  </button>
                </div>
            </div>            
            <p></p>
            </center>
          </div>            
        );
    }
}

export default MultipleChoice;