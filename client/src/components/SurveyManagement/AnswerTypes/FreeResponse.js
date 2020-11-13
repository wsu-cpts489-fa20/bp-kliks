import React from 'react';

class FreeResponse extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor() {
        super();
        this.state = {
          answer: ""
        }    
    }

    render(){
        return(
            <div>
            <center>
            <label>Answer:
                <textarea name="answer" className="form-control" rows="6" cols="75" 
                placeholder="Enter answer here" value={this.state.answer} 
                />
                </label>
            <p></p>
            </center>
          </div>            
        );
    }
}

export default FreeResponse;