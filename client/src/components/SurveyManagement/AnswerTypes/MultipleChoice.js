import React from 'react';

class MultipleChoice extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
    }

    onAddAnswer = (event) => {
      event.preventDefault();
      console.log("Adding another answer");
    }

    onRemoveAnswer = (event) => {
      event.preventDefault();
      console.log("Remove another answer");
    }
    
    render(){
        return(
            <div>
            <center>
            <div className="mb-3 input-group" style={{width:"20%"}}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Answer choice</span>
              </div>
                <input placeholder="Input answer..." aria-label="Username" aria-describedby="basic-addon1" className="form-control"/>
            </div>
              {/* <label>
                Question Title:
                <input name="title" className="form-control form-center" 
                  type="text"/>
              </label> */}
            <p></p>
            
            <div className="row justify-content-center">
                <div className="col-md-3" style={{width: "40%"}}>
                  <button type="button" style={{fontSize: "28px"}} onClick={this.onAddAnswer} 
                    className="btn btn-primary btn-color-theme">
                      <span className="fa fa-plus"/>&nbsp;Add Answer
                  </button>
                </div>
                <div className="col-md-3" style={{width: "40%"}}>
                  <button  type="button" style={{fontSize: "28px"}} onClick={this.onRemoveAnswer} 
                    className="btn btn-primary btn-color-theme">
                      <span className="fa fa-plus"/>&nbsp;Remove Answer
                  </button>
                </div>
            </div>            
            <p></p>
            </center>
          </div>            
        );
    }
}

export default MultipleChoice;