import React from 'react';

class FileUpload extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
            <center>
              <label>
                File:
                <input name="filename" className="form-control form-center" 
                  type="file"/>
              </label>
            <p></p>
            </center>
          </div>            
        );
    }
}

export default FileUpload;