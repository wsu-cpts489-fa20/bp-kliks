import React from 'react';

class SecurityQuestionDialog extends React.Component {
    constructor() {
        super();
        this.securityAnswerRef = React.createRef();
        this.state = {errorMsg: ""};
    }

    //Focus cursor in email secrity answer field when mounted
    componentDidMount() {
        this.securityAnswerRef.current.focus();
    }  

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.securityAnswerRef.current.value === this.props.answer) {
            this.props.getNewPassword();
        } else {
            this.securityAnswerRef.current.focus();
            this.setState({errorMsg: "Sorry, that is not the correct answer to the security question. Try again."});
        }
    }

    // modified the modal-title inside the header so that the text can be centered in the modal
    // this required using col-12 and text-center since messing with the CSS was not working
    // I also included new paragraph tags between the labels and buttons to create a cleaner layout
    render() {
        return (
            <div className="modal" role="dialog">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="col-12 modal-title text-center"><b>Answer Security Question</b>
                    </h3>
                    <button className="modal-close" 
                        onClick={this.props.cancelResetPassword}>
                        &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    {this.state.errorMsg != "" ? <p className="emphasis">{this.state.errorMsg}</p> : null} 
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        Security Question: 
                        <textarea
                        readOnly={true}
                        value={this.props.question}
                        className="form-control form-text"
                        rows="3"
                        cols="35"
                        />
                    </label>
                    <p></p>
                    <label>
                        Security Answer: 
                        <textarea
                        className="form-control form-text"
                        placeholder="Enter Security Question Answer"
                        ref={this.securityAnswerRef}
                        rows="3"
                        cols="35"
                        />
                    </label>
                    <p></p>
                    <button role="submit" 
                      className="btn btn-primary btn-color-theme form-submit-btn">
                        <span className="fa fa-check"></span>&nbsp;Verify Answer
                    </button>
                    </form>
                </div>
              </div>
            </div>
          </div>
          );        
    }
}
 export default SecurityQuestionDialog;