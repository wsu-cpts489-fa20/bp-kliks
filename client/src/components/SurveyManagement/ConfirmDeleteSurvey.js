
import React from 'react';

class ConfirmDeleteSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render(){
        return(
        <div id="deleteSurveyModal" className="modal"tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Delete Survey</h5>
                <button type="button" className="close" id="deleteResponseModal-closeBtn" onClick={() => {this.props.closeModal()}} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Are you sure you want to delete this survey?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" id="deleteSurveyModal-cancelBtn" onClick={() => {this.props.closeModal();}} data-dismiss="modal">Close</button>
                <button type="button" onClick={() => {this.props.deleteSurvey();}} id="deleteSurveyModal-deleteBtn" className="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
        </div>    
        );
    }

}


export default ConfirmDeleteSurvey;