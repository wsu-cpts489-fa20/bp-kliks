import React from 'react';

class SearchSurveys extends React.Component {
    constructor(props) {
      super(props);
        
      this.state = {
          surveys : this.props.surveys
      };
    }

    // Renders the survey table with the surveys for the user.
    renderTable = (surveys) => {
        let table = [];
        for (let r = 0; r < this.props.surveys.length; r++) {
            table.push(
                <tr key={surveys[r].surveyID+"-"+r}>
                <td>{surveys[r].surveyID}</td>
                <td>{surveys[r].surveyTitle}</td>
                <td>{surveys[r].surveyDate}</td>
                <td>{surveys[r].courseID}</td>
                <td>{surveys[r].questions.length}</td>
                {/* <td><button id={response.surveyID+"-"+index+"-"+"view"} onClick={this.props.menuOpen ? null : () => 
                this.viewResponse(response.surveyID+"-"+index)}>
                    <span className="fa fa-eye"></span></button></td> */}
                <td><button id={surveys[r].surveyID+"-"+r+"-"+"delete"} onClick={this.props.menuOpen ? null : 
                () => this.confirmDeleteResponse(surveys[r].surveyID+"-"+r)}>
                    <span className="fa fa-trash"></span></button></td>
            </tr>
            );
        }
        return table;
    }

    // Sorts the surveys by the courseID
    sortByCourseID = () => {
        console.log("sortByCourseID");
    }

    // Sorts the surveys by the Date the survey was created
    sortByDate = () => {
        console.log("sortByDate");
    }

    // Sorts the surveys by the surveyID
    sortBySurveyID = () => {
        console.log("sortBySurveyID");
    }

    // Sorts the surveys by the number of questions the survey has
    sortByNumberOfQuestions = () => {
        console.log("sortByNumberOfQuestions");
    }

    // Sorts the surveys by the the survey title
    sortBySurveyTitle = () => {
        console.log("sortBySurveyTitle");
    }
  
    //render--render the entire surveys table with header, displaying a "No
    //Responses made" message in case the table is empty.
    render() {
      return(
      <div id="searchSurveyTableMode" className="padded-page">
        <h1></h1>
        <div className="input-group center-search" style={{justifyContent: "center", paddingBottom: "20px"}}>
               <span className="input-group-prepend">
                   <div className="input-group-text bg-transparent border-right-0">
                     <i className="fa fa-search"></i>
                  </div>
               </span>
               <input className="form-control py-2 border-left-0 border" placeholder="Search responses" type="search" id="searchSurveys"/>
        </div>     
        <table className="table table-hover">
          <thead className="thead-light">
          <tr>
            <th><span id="surveySearch-SurveyID" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortBySurveyID}></span>&nbsp;Survey ID </th>
            <th><span id="surveySearch-SurveyTitle" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortBySurveyTitle}></span>&nbsp;Survey Title</th>
            <th><span id="surveySearch-Date" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByDate}></span>&nbsp;Survey Creation Date</th>
            <th><span id="surveySearch-CourseID" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByCourseID}></span>&nbsp;Course ID</th>
            <th><span id="surveySearch-NumberOfQuestions" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByNumberOfQuestions}></span>&nbsp;Number of Questions</th>
            {/* <th>View</th> */}
            <th>Delete</th>
          </tr>
          </thead>
          <tbody id="searchSurveyTableBody">
            {Object.keys(this.props.surveys).length === 0 ? 
            <tr>
            <td colSpan="5" style={{fontStyle: "italic"}}>No surveys created</td>
            </tr> : this.renderTable(this.state.surveys)
            }              
          </tbody>
        </table>
      </div>
      );
    }
  }
  
  export default SearchSurveys;