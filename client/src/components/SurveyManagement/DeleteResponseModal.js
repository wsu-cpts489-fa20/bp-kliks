
import React from 'react';
//import ConfirmDeleteRound from './ConfirmDeleteRound.js';
// import AppMode from './../AppMode.js';

class DeleteResponseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

      deleteResponse = (event) => {
        event.preventDefault();
        this.props.deleteResponse({
            "responseId" : this.props.responseItem.response.responseId, 
            "questionID" : this.props.responseItem.question.questionID,
            "courseID" : this.props.responseItem.survey.courseID,
            "surveyID" : this.props.responseItem.survey.surveyID
        });
        this.props.closeDeleteResponseModal();
      }

      closeModal = (event) => {
        event.preventDefault();
        this.props.closeDeleteResponseModal();
      }


    render(){
        return(
        <div className="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Delete Response</h5>
                <button type="button" className="close" onClick={this.closeModal} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Are you sure you want to delete this response?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.closeModal} data-dismiss="modal">Close</button>
                <button type="button" onClick={this.deleteResponse} className="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
        </div>    
        );
    }

}


export default DeleteResponseModal;