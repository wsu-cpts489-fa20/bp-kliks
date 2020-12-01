import React from 'react';

class ActiveQuestions extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <form  id="activeQuestionPage" className="padded-page">
            <center>
                <div class="wrapper">
                    <div className="card survey-card">
                    <button type="submit" style={{width: "100%",fontSize: "17px"}} 
                    className="btn btn-primary btn-color-theme">
                    <span className="fa fa-pencil"/>&nbsp; Edit
                    </button>
                    <div className="card-header">Question 1</div>
                    <div className="card-body">Question Type  <br/>  Content:</div> 
                    <div className="card-footer">Course Number  Section</div>
                    </div>


                    <div className="card survey-card">
                    <button type="submit" style={{width: "100%",fontSize: "17px"}} 
                    className="btn btn-primary btn-color-theme">
                    <span className="fa fa-pencil"/>&nbsp; Edit
                    </button>
                    <div className="card-header">Question 2</div>
                    <div className="card-body">Question Type  <br/>  Content:</div> 
                    <div className="card-footer">Course Number  Section</div>
                    </div>


                    <div className="card survey-card">
                    <button type="submit" style={{width: "100%",fontSize: "17px"}} 
                    className="btn btn-primary btn-color-theme">
                    <span className="fa fa-pencil"/>&nbsp; Edit
                    </button>
                    <div className="card-header">Question 3</div>
                    <div className="card-body">Question Type  <br/>  Content:</div> 
                    <div className="card-footer">Course Number  Section</div>
                    </div>


                    <div className="card survey-card">
                    <button type="submit" style={{width: "100%",fontSize: "17px"}} 
                    className="btn btn-primary btn-color-theme">
                    <span className="fa fa-pencil"/>&nbsp; Edit
                    </button>
                    <div className="card-header">Question 4</div>
                    <div className="card-body">Question Type  <br/>  Content:</div> 
                    <div className="card-footer">Course Number  Section</div>
                    </div>


                    <div className="card survey-card">
                    <button type="submit" style={{width: "100%",fontSize: "17px"}} 
                    className="btn btn-primary btn-color-theme">
                    <span className="fa fa-pencil"/>&nbsp; Edit
                    </button>
                    <div className="card-header">Question 5</div>
                    <div className="card-body">Question Type  <br/>  Content:</div> 
                    <div className="card-footer">Course Number  Section</div>
                    </div>


                    <div className="card survey-card">
                    <button type="submit" style={{width: "100%",fontSize: "17px"}} 
                    className="btn btn-primary btn-color-theme">
                    <span className="fa fa-pencil"/>&nbsp; Edit
                    </button>
                    <div className="card-header">Question 6</div>
                    <div className="card-body">Question Type  <br/>  Content:</div> 
                    <div className="card-footer">Course Number  Section</div>
                    </div>


                    <div className="card survey-card">
                    <button type="submit" style={{width: "100%",fontSize: "17px"}} 
                    className="btn btn-primary btn-color-theme">
                    <span className="fa fa-pencil"/>&nbsp; Edit
                    </button>
                    <div className="card-header">Question 7</div>
                    <div className="card-body">Question Type  <br/>  Content:</div> 
                    <div className="card-footer">Course Number  Section</div>
                    </div>
                </div>
            </center>
          </form>

        );
    }
}

export default ActiveQuestions;