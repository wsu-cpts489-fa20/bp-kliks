import React from 'react';
import SearchField from 'react-search-field'
//import ConfirmDeleteRound from './ConfirmDeleteRound.js';
// import AppMode from './../AppMode.js';

class SubmittedResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveFilter: false,
      checked: false ,
      showConfirmDelete: false,
      questions: this.props.questions,
      isSearch: false,
      searchKey : "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //called when the toggle button is clicked
  handleChange(checked) {
    this.setState({ checked });
  }

  /* 
    Name: onSearchTable
    Purpose: Given a search query, it searches for questions that contain that search query.
  */
  onSearchTable = (event) => {
    if(event.keyCode === 13){
      event.preventDefault();
      this.setState({isSearch: true}, () => {this.handleQuestions();}); //Set the state of isSearch and populate the survey state array. 
    }
  }

  /* 
    Name: onSearchKeyChange
    Purpose: Updates the searchTerm when it changes
  */
  onSearchKeyChange = (event) => {
    this.setState({searchKey : event.target.value});
  }

  editRound = (id) => {
    //this.props.setEditId(id);
    //this.props.changeMode(AppMode.SURVEY_MANAGEMENT);
  }

  deleteRound = () => {
    //this.props.deleteRound();
    //this.setState({showConfirmDelete:false});

  }

  confirmDelete = (id) => {
    //this.props.setDeleteId(id);
    //this.setState({showConfirmDelete:true});
  }

  hideConfirmDeleteBox = () => {
    //this.setState({showConfirmDelete:false});
  }

  // Handles how we are going to search and potentially sort questions.
  handleQuestions = () => {
    let sortedQuestions = this.props.questions;
    let isSearch = this.state.isSearch;

    // First check if we need to perform any searches
    if(this.state.isSearch){
      var searchedQuestions = [];
      sortedQuestions.forEach((question) => {
        var rowString = "";
        rowString += question.question.questionTitle;
        rowString += question.question.questionText + " ";
        rowString += question.question.questionAnswers + " ";
        rowString += question.question.questionActive + " ";

        if(rowString.toUpperCase().indexOf(this.state.searchKey.toUpperCase()) > -1){
          searchedQuestions.push(question);
        }
      });        

      sortedQuestions = searchedQuestions;
      isSearch = false;
    }

    // Update the state variables
    this.setState({
      isSearch: isSearch,
      questions : sortedQuestions
    });
  }  
  
  // Updates the Questions array with the correct content that is going to be rendered.
  updateQuestions = () => {
    var stateQuestions = this.state.questions;
    var propQuestions = this.props.questions.map((value) => {return value.questionID;});
    var questionsToRemove = [];

    // Here we are finding the questions that are different between the newState (this.props.questions) and the current state of questions
    stateQuestions.forEach((question)=>{
      var result = propQuestions.includes(question.questionID);
      if(result == false){
        questionsToRemove.push(question.questionID);
      }
    });

    // Here we remove the elements that have been removed in the this.props.questions array. 
    let final_questions = stateQuestions.filter((question) => !questionsToRemove.includes(question.questionID));
    if(final_questions.length == 0){
      final_questions = this.state.questions;
    }
    return final_questions;
  }  

  renderTable = () => {
    var questions = this.updateQuestions(this.props.questions);

    let table = [];
    if (this.state.ActiveFilter == false)
    {
      for (let r = 0; r < questions.length; r++) {
        table.push(
          <tr key={r}>
            <td>{questions[r].question.questionTitle}</td>
            <td>{questions[r].question.questionText}</td>
            <td>{questions[r].question.questionAnswers}</td>
            <td>{questions[r].question.questionActive}</td>
            <td><button onClick={this.props.menuOpen ? null : null}>
                  <span className="fa fa-eye"></span></button></td>
            <td><button onClick={this.props.menuOpen ? null : 
              null}>
                  <span className="fa fa-trash"></span></button></td>
          </tr> 
        );
      }
    }
    else if (this.state.ActiveFilter == true)
    {
      for (let r = 0; r < questions.length; r++) {
        if (questions[r].questionActive == true)
        {
          table.push(
            <tr key={r}>
              <td>{questions[r].question.questionTitle}</td>
              <td>{questions[r].question.questionText}</td>
              <td>{questions[r].question.questionAnswers}</td>
              <td>{questions[r].question.questionActive}</td>
              <td><button onClick={this.props.menuOpen ? null : null}>
                    <span className="fa fa-eye"></span></button></td>
              <td><button onClick={this.props.menuOpen ? null : 
                null}>
                    <span className="fa fa-trash"></span></button></td>
            </tr> 
          );
        }
      }
    }
    return table;
    }

  switchHandler = () => {
    // console.log(this.state.ActiveFilter);
    if (this.state.ActiveFilter == false)
    {
      this.setState({ActiveFilter: true});
    }
    else
    {
      this.setState({ActiveFilter: false});
    }
  }

  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page" id={"searchQuestionsMode"}>
      <center>
      <h4>Question Filter (Active Only or All Questions): </h4>  
      <label class="switch"><input type="checkbox" id="togBtn" onClick={this.switchHandler}/>
        <div class="slider round">
        <span class="on">Active</span><span class="off">All</span>
        </div>
      </label>
      <p></p>
      <div className="input-group center-search" style={{justifyContent: "center", paddingBottom: "20px"}}>
               <span className="input-group-prepend">
                   <div className="input-group-text bg-transparent border-right-0">
                     <i className="fa fa-search"></i>
                  </div>
               </span>
               <input className="form-control py-2 border-left-0 border"
               placeholder="Search responses"
               type="search"
               id="searchQuestions"
               onChange={this.onSearchKeyChange}
               onKeyUp={this.onSearchTable}
               />
        </div> 
        
         {/* <div className="input-group center-search" style={{justifyContent: "center", paddingBottom: "20px"}}>
            <SearchField
              classNames="search-width"
              placeholder="Search question"
              onSearchClick={this.onSearchClicked}
          /> */}
             {/* <span className="input-group-prepend">
                 <div className="input-group-text bg-transparent border-right-0"><i className="fa fa-search"></i></div>
             </span>
             <input className="form-control py-2 border-left-0 border" placeholder="Search Rounds" type="search" value="" id="searchRounds"
             onkeyup="searchRoundsTable(this.value)" onSearch onsearch="searchRoundsTable(this.value)"/> */}
         {/* </div> */}
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th>Title</th>
          <th>Question</th>
          <th>Answer Type</th>
          <th>Is Active</th>
          <th>View/Edit...</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.questions).length === 0 ? 
            <tr>
            <td colSpan="6" style={{fontStyle: "italic"}}>There no questions that have been created.</td>
            </tr> : this.renderTable()
          }
          </tbody>
        <tbody>
        </tbody>
        <tbody>
        </tbody>
      </table>
      </center>
    </div>
    );
  }
}

export default SubmittedResponse;