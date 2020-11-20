import React from 'react';

class ViewResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions : [],
      allResponses : [],
      showConfirmDelete: false
    };
  }

 /* 
    Name: handleAnswers
    Purpose: Display the correct answer depending on the type of answer type.
  */
  handleAnswers = () => {
      if(this.props.responseItem.question.questionAnswers.length == 1){
        if(this.props.responseItem.question.questionType == "FileUpload" || this.props.responseItem.question.questionType == "F"){
            return (
                <iframe
                    id="viewResponse-answer-file"
                    src={this.props.responseItem.question.questionAnswers[0]}
                > </iframe>
            );
        }
        
        return (
            <div id="viewResponse-answer-freeResponse">
                {this.props.responseItem.question.questionAnswers[0]}
            </div>
        );
      }

    var answers = this.props.responseItem.question.questionAnswers;
    var elements = [];
    answers.forEach((answer) => {
        elements.push(
            <div>{answer}</div>
        );
    });

    return (
        <div id="viewResponse-answer-multipleChoice">{elements}</div>
    );
  }

  render(){
    return (
        <div id="viewResponseModal" className="modal" itemID="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{this.props.responseItem.survey.surveyTitle}</h5>
                <button type="button" className="close" data-dismiss="modal" id="viewResponseModal-exitBtn"  onClick={ () => { this.props.closeResponse();} } aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div class="form-group">
                    <label for="recipient-name" style={{fontSize:"22pt"}} class="col-form-label">Question:</label>
                    <div class="form-control" id="viewResponse-question">{this.props.responseItem.question.questionText}</div>
                </div>
                <div class="form-group">
                    <label for="recipient-name" style={{fontSize:"22pt"}} class="col-form-label">Response:</label>
                    <div class="form-control" id="viewResponse-response">{this.props.responseItem.response.surveyResponse}</div>
                </div>       
            </div>
            <div className="modal-body">
                <div class="form-group">
                    <label for="recipient-name" style={{fontSize:"22pt"}} class="col-form-label">Answer(s):</label>
                    <div class="form-control" id="viewResponse-answer">{this.handleAnswers()}</div>
                </div>       
            </div>
            <div className="modal-footer">
                <button id="viewResponseModal-closeBtn" type="button" className="btn btn-secondary" onClick={ () => { this.props.closeResponse();}} data-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
            </div>
        </div>
        </div>
    );
  }

}
export default ViewResponse;
