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

        this.state =  {
          selectedOptions : []
        };
    }

    // Handles the onchange for the selected items.
    handleChange = (event) => {
      let newSelectedOptions = event.target.value;
      let selectedOptions = this.state.selectedOptions;
  
      console.log(selectedOptions)
      console.log(newSelectedOptions)
      if(selectedOptions.indexOf(newSelectedOptions) === -1)
      {
        selectedOptions.push(newSelectedOptions);
      }
      else{
        if(selectedOptions.length === 1)
        {
          selectedOptions = [];
        }
        else{
          selectedOptions.splice(selectedOptions.indexOf(newSelectedOptions), 1);
        }
      }

      this.setState({ selectedOptions: selectedOptions }, ()=> { console.log("String representation:"); console.log(this.state.selectedOptions.toString()); console.log(this.state.selectedOptions);});
    }

    render(){
        return(
            <div>
            <center>
            <p></p>
            <label>Acceptable File Types:
            <select name="answerType" multiple={true} value={this.state.selectedOptions} onChange={this.handleChange} 
              id={"createQuestion-file-fileTypes"}
              className="form-control form-center">
              <option value=".pdf">pdf</option>
              <option value=".docx">docx</option>
              <option value=".jpg">jpg</option>
              <option value=".jpeg">jpeg</option>
              <option value=".png">png</option>
              <option value=".doc">doc</option>                     
            </select> 
            </label>
            <p></p>
              <label>
                File:
                <input name="file" className="form-control form-center" 
                id={"createQuestion-file-upload"}
                onChange={this.onFileChange}
                ref={this.fileRef}
                value={this.state.fileObj}
                type="file"
                accept={this.state.selectedOptions.toString()}/>
              </label>
            <p></p>
            </center>
          </div>            
        );
    }
}

export default FileUpload;