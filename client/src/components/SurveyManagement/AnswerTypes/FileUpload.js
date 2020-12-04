import React from 'react';

class FileUpload extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        this.state = {
          file : "",
          selectedOptions : []
        }
    }
    
    // Handle the file changes
    onFileChange = (event) => {

      if(event.target.value.length == 0)
      {
        this.props.setAnswer([this.result]);
        this.setState({file:  ""});
      }
      else
      {
        //The user selected a file
        const self = this;
        const reader = new FileReader();
        reader.readAsDataURL(this.fileRef.current.files[0]);
        reader.addEventListener("load",function() {
            self.props.setAnswer([this.result]);
            self.setState({file:  this.result});
          });
        }

        this.props.setAcceptableAnswerTypes(this.state.selectedOptions);
    }

    render(){
        return(
            <div>
            <center>
              <label>
                File:
                <input name="file" className="form-control form-center" 
                onChange={this.onFileChange}
                ref={this.fileRef}
                value={this.state.fileObj}
                  type="file"/>
              </label>
            <p></p>
            </center>
          </div>            
        );
    }
}

export default FileUpload;