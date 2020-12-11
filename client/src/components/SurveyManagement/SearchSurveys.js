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
      console.log(this.props.surveys);
      console.log(this.state.surveys);
      let sortedSurveys = this.props.surveys;//surveys;
      let isSearch = this.state.isSearch;
      let isSort = this.state.isSort;

      console.log("isSort=", isSort);
      console.log("isSearch=", isSearch);

      if(this.state.isSearch){
        console.log("Searching for Surveys.");

        var searchedSurveys = [];
        sortedSurveys.forEach((survey) => {
          var rowString = "";
          rowString += survey.surveyID;
          rowString += survey.surveyTitle + " ";
          rowString += survey.surveyDate + " ";
          rowString += survey.courseID + " ";
          rowString += survey.questions.length + " ";

          console.log(rowString);

          if(rowString.toUpperCase().indexOf(this.state.searchKey.toUpperCase()) > -1){
            searchedSurveys.push(survey);
          }
        });        

        sortedSurveys = searchedSurveys;
        isSearch = false;
      }

      if(isSort){
        console.log("Sorting Surveys.");
        console.log("Sorting: ", this.state.sortType);
        if(this.state.sortType == SortSurvey.questions){
          sortedSurveys.sort((surveyA, surveyB) => {
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
          // Date.parse('2013/08/26')
          sortedSurveys.sort((surveyA, surveyB) => {
            let dateA = Date.parse(surveyA[this.state.sortType]);
            let dateB = Date.parse(surveyB[this.state.sortType]);
            console.log(dateA);
            console.log(dateB);
            if(dateA < dateB){
              console.log("LESS");
              return this.state.sortDateAscending ? 1 : -1;
            }
            if(dateA > dateB){
              console.log("MORE");
              return this.state.sortDateAscending ? -1 : 1;
            }
            return 0;
          });          
        }
        else{
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
      
      console.log(sortedSurveys);

      this.setState({
        isSort : isSort,
        isSearch: isSearch,
        surveys : sortedSurveys
      }, () => {
      console.log("Updated isSort and Sort");
      });
      // return sortedSurveys;
    }

  /* 
    Name: SearchResponseTable
    Purpose: Given a search query, it searches for responses/questions that contain that search query.
  */
  onSearchTable = (event) => {
    if(event.keyCode === 13){
      event.preventDefault();

      console.log("Enter KEY is hit and we are Searching");
      this.setState({isSearch: true}, () => {this.populateSurveys();});
      // this.populateSurveys();
      
      // // Do some reduction to only display the elements that match that searchKey -- Surveys.
      // if(this.state.searchKey.length > 0){
      //   this.setState({isSearch: false, searchKey: ""});
      // }
      // else{
      //   console.log("Other than keyCode 13");
      //   this.setState({isSearch: false});
      // }
    }
  }

  deleteSurvey = () => {
    this.props.deleteSurvey();
    this.props.updateSurveys();
    this.setState({showConfirmDelete: false});      
  }

  confirmDelete = (survey) => {
    this.props.setSurveyDelete(survey);
    this.setState({showConfirmDelete: true});      
  }

  /* 
    Name: onSearchKeyChange
    Purpose: Updates the searchTerm when it changes
  */
  onSearchKeyChange = (event) => {
    console.log(event.target.value);
    this.setState({searchKey : event.target.value});
  }

  populateSurveys = () => {
    this.handleSurveys(this.props.surveys);
    // this.setState({surveys: result});
  }

  updateSurveys = () => {
    console.log("this.updateSurveys");
    console.log(this.props.surveys);
    console.log(this.state.surveys);
    var stateSurveys = this.state.surveys;
    var propSurveys = this.props.surveys.map((value) => {return value.surveyID;});
    var surveysToRemove = [];
    stateSurveys.forEach((survey)=>{
      var result = propSurveys.includes(survey.surveyID);// this.props.surveys.filter(data => (data.surveyID != survey.surveyID));
      if(result == false){
        surveysToRemove.push(survey.surveyID);
      }
    });

    let final_surveys = stateSurveys.filter((survey) => !surveysToRemove.includes(survey.surveyID));
    console.log(surveysToRemove);

    if(final_surveys.length == 0){
      final_surveys = this.state.surveys;
    }

    console.log(final_surveys);
    return final_surveys;
  }

    // Renders the survey table with the surveys for the user.
    renderTable = (surveys) => {
      console.log("Render Table fired");
      
      // var surveys = this
      surveys = this.updateSurveys();
        // surveys = this.handleSurveys(surveys);
        console.log("Render Table fired AFTER");
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
                <td><button id={surveys[r].surveyID+"-"+"delete"} onClick={this.props.menuOpen ? null : 
                () => this.confirmDelete(surveys[r])}>
                    <span className="fa fa-trash"></span></button></td>
            </tr>
            );
        }
        return table;
    }

    onSortBySurveyID = () => {
      console.log("Sort by: "+ SortSurvey.surveyID); 
      this.setState({sortType: SortSurvey.surveyID, onSortBySurveyID: !this.state.sortSurveyIDAscending, isSort: true}, 
      () => {this.populateSurveys();});
    }

    onSortByCourseID = () => {
      console.log("Sort by: "+ SortSurvey.courseID);
      this.setState({sortType: SortSurvey.courseID, sortCourseIDAscending: !this.state.sortCourseIDAscending, isSort: true},
        () => {this.populateSurveys();});

    }

    onSortByNumberOfQuestions = () => {
      console.log("Sort by: "+ SortSurvey.questions);
      this.setState({sortType: SortSurvey.questions, sortNumberOfQuestionsAscending: !this.state.sortNumberOfQuestionsAscending, isSort: true},
        () => {this.populateSurveys();});

    }

    onSortBySurveyTitle = () => {
      console.log("Sort by: "+ SortSurvey.surveyTitle);
      this.setState({sortType: SortSurvey.surveyTitle, sortSurveyTitleAscending: !this.state.sortSurveyTitleAscending, isSort: true}, 
        () => {this.populateSurveys();});
    }

    onSortByDate = () => {
      console.log("Sort by: "+ SortSurvey.surveyDate);
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