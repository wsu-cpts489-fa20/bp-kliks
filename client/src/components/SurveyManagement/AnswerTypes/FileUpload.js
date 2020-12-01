import React from 'react';

class FileUpload extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);

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
                <input name="filename" className="form-control form-center" 
                  type="file" accept={this.state.selectedOptions.toString()}/>
              </label>
            <p></p>
            </center>
          </div>            
        );
    }
}

export default FileUpload;