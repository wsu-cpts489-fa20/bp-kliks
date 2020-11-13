import React from 'react';

class SurveyItem extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor() {
        super();          
    }

    render(){
        return(
            <div class="wrapper">
            <div className="card survey-card">
                <div className="card-header">Question 1</div>
                <div className="card-body">Question Type  <br/>  Content:</div> 
                <div className="card-footer">Course Number  Section</div>
            </div>


            <div className="card survey-card">
                <div className="card-header">Question 2</div>
                <div className="card-body">Question Type  <br/>  Content:</div> 
                <div className="card-footer">Course Number  Section</div>
            </div>

            <div className="card survey-card">
                <div className="card-header">Question 3</div>
                <div className="card-body">Question Type  <br/>  Content:</div> 
                <div className="card-footer">Course Number  Section</div>
            </div>


            <div className="card survey-card">
                <div className="card-header">Question 4</div>
                <div className="card-body">Question Type  <br/>  Content:</div> 
                <div className="card-footer">Course Number  Section</div>
            </div>


            <div className="card survey-card">
                <div className="card-header">Question 5</div>
                <div className="card-body">Question Type  <br/>  Content:</div> 
                <div className="card-footer">Course Number  Section</div>
            </div>


            <div className="card survey-card">
                <div className="card-header">Question 6</div>
                <div className="card-body">Question Type  <br/>  Content:</div> 
                <div className="card-footer">Course Number  Section</div>
            </div>


            <div className="card survey-card">
                <div className="card-header">Question 7</div>
                <div className="card-body">Question Type  <br/>  Content:</div> 
                <div className="card-footer">Course Number  Section</div>
            </div>
            </div>
        );
    }
}

export default SurveyItem;