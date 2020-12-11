// SearchSurvey page that allows the instructor to search for surveys that they have made.
// In addition to searching, an instuctor can remove and soort surveys.

import React from 'react';
import ConfirmDeleteSurvey from './ConfirmDeleteSurvey.js';
import { SortSurvey } from './SortTypes.js'

class SearchSurveys extends React.Component {
    constructor(props) {
      super(props);        
      this.state = {
          surveys : this.props.surveys,
          showConfirmDelete: false,
          isSort: false,
          sortType: SortSurvey.courseID,
          isSearch: false,
          searchKey : "",

      // Sort state variables
      sortCourseIDAscending: false,
      sortDateAscending: false,
      sortSurveyIDAscending : false,
      sortSurveyTitleAscending: false,
      sortNumberOfQuestionsAscending : false
      };
    }

    toggleSearch = () => {
      this.setState({isSearch: !this.state.isSort});
    }

    toggleSort = () => {
      this.setState({isSort: !this.state.isSort});
    }

    setSort = (sortName) => {
      this.setState({sortType: sortName});
    }

    handleSurveys = (surveys) => {
      let sortedSurveys = this.props.surveys;//surveys;
      let isSearch = this.state.isSearch;
      let isSort = this.state.isSort;

      // First check if we need to perform any searches
      if(this.state.isSearch){
        var searchedSurveys = [];
        sortedSurveys.forEach((survey) => {
          var rowString = "";
          rowString += survey.surveyID;
          rowString += survey.surveyTitle + " ";
          rowString += survey.surveyDate + " ";
          rowString += survey.courseID + " ";
          rowString += survey.questions.length + " ";

          if(rowString.toUpperCase().indexOf(this.state.searchKey.toUpperCase()) > -1){
            searchedSurveys.push(survey);
          }
        });        

        sortedSurveys = searchedSurveys;
        isSearch = false;
      }

      // Check if we need to sort
      if(isSort){
        if(this.state.sortType == SortSurvey.questions){
          sortedSurveys.sort((surveyA, surveyB) => {
            // Check against the lengths
            if(surveyA.questions.length < surveyB.questions.length){
              return this.state.sortNumberOfQuestionsAscending ? 1 : -1;
            }
            if(surveyA.questions.length > surveyB.questions.length){
              return this.state.sortNumberOfQuestionsAscending ? -1 : 1;
            }
            return 0;
          });
        }
        else if(this.state.sortType == SortSurvey.surveyDate){
          sortedSurveys.sort((surveyA, surveyB) => {
            // Turn the date options into Date types so that they are easier to compare.
            let dateA = Date.parse(surveyA[this.state.sortType]);
            let dateB = Date.parse(surveyB[this.state.sortType]);
            if(dateA < dateB){
              return this.state.sortDateAscending ? 1 : -1;
            }
            if(dateA > dateB){
              return this.state.sortDateAscending ? -1 : 1;
            }
            return 0;
          });          
        }
        else{
          // Sort the rest the same way
            sortedSurveys.sort((surveyA, surveyB) => {
              if(surveyA[this.state.sortType] < surveyB[this.state.sortType]){
                  if(this.state.sortType == "courseID"){
                    return this.state.sortCourseIDAscending ? 1 : -1;
                  }
                  else if(this.state.sortType == "surveyTitle"){
                    return this.state.sortSurveyTitleAscending ? 1 : -1;
                  }
                  else if(this.state.sortType == "surveyID"){
                    return this.state.sortSurveyIDAscending ? 1 : -1;
                  }
              }
              if(surveyA[this.state.sortType] > surveyB[this.state.sortType]){
                  if(this.state.sortType == "courseID"){
                    return this.state.sortCourseIDAscending ? -1 : 1;
                  }
                  else if(this.state.sortType == "surveyTitle"){
                    return this.state.sortSurveyTitleAscending ? -1 : 1;
                  }
                  else if(this.state.sortType == "surveyID"){
                    return this.state.sortSurveyIDAscending ? -1 : 1;
                  }
              }
              return 0;
            });
        }

        isSort = false;
      }

      // Update the state variables
      this.setState({
        isSort : isSort,
        isSearch: isSearch,
        surveys : sortedSurveys
      });
    }

  /* 
    Name: onSearchTable
    Purpose: Given a search query, it searches for surveys that contain that search query.
  */
  onSearchTable = (event) => {
    if(event.keyCode === 13){
      event.preventDefault();
      this.setState({isSearch: true}, () => {this.populateSurveys();}); //Set the state of isSearch and populate the survey state array. 
    }
  }

  // Deletes a survey from MonogDB
  deleteSurvey = () => {
    this.props.deleteSurvey(); // Call parent component to make the route call 
    this.props.updateSurveys(); // Update the surveys 
    this.setState({showConfirmDelete: false});
  }

  // ConfirmDelete: confirms that the user wants to delete the survey that they selected.
  confirmDelete = (survey) => {
    this.props.setSurveyDelete(survey);
    this.setState({showConfirmDelete: true}); //Set the confirm delete state
  }

  /* 
    Name: onSearchKeyChange
    Purpose: Updates the searchTerm when it changes
  */
  onSearchKeyChange = (event) => {
    this.setState({searchKey : event.target.value});
  }

  // Calls the handle surveys method.
  populateSurveys = () => {
    this.handleSurveys(this.props.surveys);
  }

  // Updates the Survey array with the correct content that is going to be rendered.
  updateSurveys = () => {
    var stateSurveys = this.state.surveys;
    var propSurveys = this.props.surveys.map((value) => {return value.surveyID;});
    var surveysToRemove = [];

    // Here we are finding the surveys that are different between the newState (this.props.surveys) and the current state of survey
    stateSurveys.forEach((survey)=>{
      var result = propSurveys.includes(survey.surveyID);
      if(result == false){
        surveysToRemove.push(survey.surveyID);
      }
    });

    // Here we remove the elements that have been removed in the this.props.surveys array. 
    let final_surveys = stateSurveys.filter((survey) => !surveysToRemove.includes(survey.surveyID));
    if(final_surveys.length == 0){
      final_surveys = this.state.surveys;
    }
    return final_surveys;
  }

    // Renders the survey table with the surveys for the user.
    renderTable = (surveys) => 
    {      
      surveys = this.updateSurveys();
      let table = [];
      for (let r = 0; r < surveys.length; r++) {
          table.push(
              <tr key={surveys[r].surveyID+"-"+r}>
              <td>{surveys[r].surveyID}</td>
              <td>{surveys[r].surveyTitle}</td>
              <td>{surveys[r].surveyDate}</td>
              <td>{surveys[r].courseID}</td>
              <td id={surveys[r].surveyID+"-"+"questionsLength"}>{surveys[r].questions.length}</td>
              {/* <td><button id={response.surveyID+"-"+index+"-"+"view"} onClick={this.props.menuOpen ? null : () => 
              this.viewResponse(response.surveyID+"-"+index)}>
                  <span className="fa fa-eye"></span></button></td> */}
              <td><button id={r+"delete"} onClick={this.props.menuOpen ? null : 
              () => this.confirmDelete(surveys[r])}>
                  <span className="fa fa-trash"></span></button></td>
          </tr>
          );
      }
      return table;
    }

    // Sets the state variables that pertain to sorting by the surveyid
    onSortBySurveyID = () => {
      this.setState({sortType: SortSurvey.surveyID, onSortBySurveyID: !this.state.sortSurveyIDAscending, isSort: true}, 
      () => {this.populateSurveys();});
    }

      // Sets the state variables that pertain to sorting by the course id
    onSortByCourseID = () => {
      this.setState({sortType: SortSurvey.courseID, sortCourseIDAscending: !this.state.sortCourseIDAscending, isSort: true},
        () => {this.populateSurveys();});

    }

    // Sets the state variables that pertain to sorting by the number of questions in a survey
    onSortByNumberOfQuestions = () => {
      this.setState({sortType: SortSurvey.questions, sortNumberOfQuestionsAscending: !this.state.sortNumberOfQuestionsAscending, isSort: true},
        () => {this.populateSurveys();});

    }

    // Sets the state variables that pertain to sorting by the title    
    onSortBySurveyTitle = () => {
      this.setState({sortType: SortSurvey.surveyTitle, sortSurveyTitleAscending: !this.state.sortSurveyTitleAscending, isSort: true}, 
        () => {this.populateSurveys();});
    }

    // Sets the state variables that pertain to sorting by the date
    onSortByDate = () => {
      this.setState({sortType: SortSurvey.surveyDate, sortDateAscending: !this.state.sortDateAscending, isSort: true},
        () => {this.populateSurveys();});
    }

    //render--render the entire surveys table with header, displaying a "No
    //Responses made" message in case the table is empty.
    render() {
      // var rows =  this.renderTable();

      return(
      <div id="searchSurveyTableMode" className="padded-page">
        <h1></h1>
        <div className="input-group center-search" style={{justifyContent: "center", paddingBottom: "20px"}}>
               <span className="input-group-prepend">
                   <div className="input-group-text bg-transparent border-right-0">
                     <i className="fa fa-search"></i>
                  </div>
               </span>
               <input className="form-control py-2 border-left-0 border"
               placeholder="Search responses"
               type="search"
               id="searchSurveys"
               onChange={this.onSearchKeyChange}
               onKeyUp={this.onSearchTable}
               />
        </div>     
        <table className="table table-hover">
          <thead className="thead-light">
          <tr>
            <th><span id="surveySearch-SurveyID" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.onSortBySurveyID}></span>&nbsp;Survey ID </th>
            <th><span id="surveySearch-SurveyTitle" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.onSortBySurveyTitle}></span>&nbsp;Survey Title</th>
            <th><span id="surveySearch-Date" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.onSortByDate}></span>&nbsp;Survey Creation Date</th>
            <th><span id="surveySearch-CourseID" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.onSortByCourseID}></span>&nbsp;Course ID</th>
            <th><span id="surveySearch-NumberOfQuestions" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.onSortByNumberOfQuestions}></span>&nbsp;Number of Questions</th>
            {/* <th>View</th> */}
            <th>Delete</th>
          </tr>
          </thead>
          <tbody id="searchSurveyTableBody">
            {Object.keys(this.props.surveys).length === 0 ? 
            <tr>
            <td colSpan="5" style={{fontStyle: "italic"}}>No surveys created</td>
            </tr> : this.renderTable(this.props.surveys)
            }              
          </tbody>
        </table>
        {this.state.showConfirmDelete ?
          <ConfirmDeleteSurvey
            closeModal={() => this.setState({showConfirmDelete: false})} 
            deleteSurvey={this.deleteSurvey}
          />
          : null
        }        
      </div>
      );
    }
  }
  
  export default SearchSurveys;