import React from 'react';

class FileUpload extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor() {
        super();          
    }

    render(){
        return(
            <div>
            <center>
              <label>
                Question Title:
                <input name="title" className="form-control form-center" 
                  type="text"/>
              </label>
            <p></p>
            <button style={{width: "70%",fontSize: "36px"}} 
              className="btn btn-primary btn-color-theme">
                <span className={this.state.faIcon}/>&nbsp;Add Answer
            </button>
            </center>
          </div>            
        );
    }
}

export default FileUpload;