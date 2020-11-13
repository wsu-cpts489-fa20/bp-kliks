import React from 'react';
import SurveyItem from './SurveyManagement/surveyItem.js'
import SubmittedResponse from './SurveyManagement/SubmittedResponse.js'
import AppMode from './../AppMode.js'

class SurveyManagementPage extends React.Component {

    constructor(props)
    {
        super(props);
    }
    
    render() {
        // switch(this.props.mode) {
        //     case AppMode.SURVEY_MANAGEMENT_RESPONSES:
        //         return (
        //             <SubmittedResponse  /> 
        //         );
        // }
        return(
        <SubmittedResponse/>
        );
    }   
}

export default SurveyManagementPage;