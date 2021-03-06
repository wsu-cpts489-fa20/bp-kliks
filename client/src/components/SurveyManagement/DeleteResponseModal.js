
import React from 'react';

class DeleteResponseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    /* 
        Name: deleteResponse
        Purpose: OnClick handler to delete the response.
                Calls the delete response in the SubmittedResponse componenet.
    */      
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

        /* 
            Name: closeModal
            Purpose: Close the modal.
        */ 
      closeModal = (event) => {
        event.preventDefault();
        this.props.closeDeleteResponseModal();
      }

    render(){
        return(
        <div id="deleteResponseModal" className="modal"tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Delete Response</h5>
                <button type="button" className="close" id="deleteResponseModal-closeBtn" onClick={this.closeModal} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Are you sure you want to delete this response?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" id="deleteResponseModal-cancelBtn" onClick={this.closeModal} data-dismiss="modal">Close</button>
                <button type="button" onClick={this.deleteResponse} id="deleteResponseModal-deleteBtn" className="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
        </div>    
        );
    }

}


export default DeleteResponseModal;