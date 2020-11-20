import React from 'react'

class ResetPasswordDialog extends React.Component {
    constructor() {
        super();
        this.resetPasswordRef = React.createRef();
        this.resetPasswordRepeatRef = React.createRef();
        this.state = {errorMsg: ""};
    }

    //handleSubmit -- When the user submits the form, ensure that the passwords match.
    //If so, call on resetPassword in parent component to actually reset the password.
    //Otherwise, display an error message prompting the user to try again.
    handleSubmit= (event) => {
        event.preventDefault();
        if (this.resetPasswordRef.current.value === this.resetPasswordRepeatRef.current.value) {
            this.props.resetPassword(this.resetPasswordRef.current.value);
        } else {
            this.resetPasswordRepeatRef.current.focus();
            this.setState({errorMsg: "The passwords you entered do not match. Please try again."});
        }
    }

    checkForSubmit = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            this.handleSubmit();
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
                    <h3 className="col-12 modal-title text-center"><b>Reset Password</b>
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
                        New Password: 
                        <input
                        type="password"
                        id="NewPassword"
                        placeholder="Enter new password"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                        className="form-control form-text"
                        ref={this.resetPasswordRef}
                        />
                    </label>
                    <p></p>
                    <label>
                        Repeat New Password: 
                        <input
                        type="password"
                        id="RepeatPassword"
                        placeholder="Repeat new password"
                        className="form-control form-text"
                        onKeyUp={this.checkForSubmit}
                        ref={this.resetPasswordRepeatRef}
                        />
                    </label>
                    <p></p>
                    <button role="submit" id="PasswordButton"
                     className="btn btn-primary btn-color-theme form-submit-btn">
                        <span className="fa fa-key"></span>&nbsp;Reset Password
                    </button>
                    </form>
                </div>
              </div>
            </div>
          </div>
          );
        
    }
}

export default ResetPasswordDialog;