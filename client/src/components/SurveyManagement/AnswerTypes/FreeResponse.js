import React from 'react';

class FreeResponse extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
        this.state = {
          answer: ""
        }
    }

    // Handle the response change
    onResponseChange = (event) => {
        this.props.setAnswer([event.target.value]);
        this.setState({
            answer : event.target.value
        });
    }

    render(){
        return(
            <div>
            <center>
            <label>Answer:
                <textarea name="answer" className="form-control" rows="6" cols="75" 
                placeholder="Enter answer here" value={this.state.answer} 
                onChange={this.onResponseChange}
                />
                </label>
            <p></p>
            </center>
          </div>            
        );
    }
}

export default FreeResponse;