import React from 'react';
import SurveyItem from './SurveyManagement/surveyItem.js'

class SurveyManagementPage extends React.Component {

    render() {
        return (
        <div className="padded-page" style={{paddingBottom: "50px"}}>
            <center>
            <SurveyItem/>
            {/* <h1 >SurveyManagement</h1>
            <h2>This page is under construction.</h2>
            <img src="https://dl.dropboxusercontent.com/s/qpjhy9x9gwdxpob/SpeedScoreLogo64Trans.png" 
             height="200" width="200"/>
            <p style={{fontStyle: "italic"}}>Version CptS 489 React Demo</p> */}
            </center>
        </div>
        );
    }   
}

export default SurveyManagementPage;