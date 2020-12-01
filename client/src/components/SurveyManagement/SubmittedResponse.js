import React from 'react';
import { async } from 'regenerator-runtime';
import DeleteResponseModal from './DeleteResponseModal';
import ViewResponse from './viewResponseModal';


class SubmittedResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions : this.props.questions,
      responses : this.props.responses,
      showResponseModal : false,
      showConfirmDelete: false,
      editRowId: "",
      responseItem : {},
      searchKey : "",
      showDeleteResponseModal : false,

      // Sort state variables
      sortResponseInOrder: false,
      sortDateInOrder: false,
      sortQuestionInOrder: false,
      sortResponseTypeInOrder: false
    };
  }

  componentDidMount() {
  }

  // TO DO Delete all RESPONSES BUTTON


  //renderResponseTable -- render an HTML table displaying the responses made
  //by the students of all courses for the instructor and providing buttons to view and delete each response.
  renderResponseTable = (allResponses) => {
  let table = [];
  console.log("renderResponseTable");
  console.log(allResponses);
    var index = 0;
    allResponses.forEach((response)=>{
      console.log("index");
      table.push(
        <tr key={response.surveyID+"-"+response.question.questionID+"-"+response.responseId+"-"+index}>
          <td>{response.responseType}</td>
          <td>{response.question.questionText}</td>
          <td>{response.response.responseDateTime}</td>
          <td>{response.response.surveyResponse}</td>
          <td><button id={response.surveyID+"-"+response.question.questionID+"-"+response.response.responseId+"-"+index+"-"+"view"} onClick={this.props.menuOpen ? null : () => 
          this.viewResponse(response.surveyID+"-"+response.question.questionID+"-"+response.response.responseId+"-"+index)}>
              <span className="fa fa-eye"></span></button></td>
          <td><button id={response.surveyID+"-"+response.question.questionID+"-"+response.response.responseId+"-"+index+"-"+"delete"} onClick={this.props.menuOpen ? null : 
          () => this.confirmDeleteResponse(response.surveyID+"-"+response.question.questionID+"-"+response.response.responseId+"-"+index)}>
              <span className="fa fa-trash"></span></button></td>
        </tr>
      );
      index++;     
    });
  return table;
  }


  /* 
    Name: ViewResponse
    Purpose: Views a response from the specific row clicked on
  */
  viewResponse = (rowId) => {
    console.log("viewResponse: rowId");
    console.log(rowId);

    let responseKeys = this.parseResponseRowId(rowId);    
    var response = this.state.responses.find((response) => {
      if((response.surveyID == responseKeys[0]) && (response.questionID == responseKeys[1]) && 
      (response.response.responseId == responseKeys[2])){
        return true;
      }
      return false;
    });
    
    console.log("viewResponse: responseObject");
    console.log(response);
    this.setState({showResponseModal : true, editRowId: rowId, responseItem : response});
    console.log("Viewing a response");
  }

  /* 
    Name: parseResponseRowId
    Purpose: Parses the row key from the response table and returns an array of keys
    in the form: [surveyID, questionID, responseId, index]
  */
  parseResponseRowId = (id) => {
    let keys = id.split("-");
    return keys;
  }

  /* 
    Name: confirmDeleteResponse
    Purpose: Confirms to delete a response from the database given the response object
  */
  confirmDeleteResponse = (rowId) => {
    console.log("confirmDeleteResponse: rowId");
    console.log(rowId);

    let responseKeys = this.parseResponseRowId(rowId);    

    var response = this.state.responses.find((response) => {
      if((response.surveyID == responseKeys[0]) && (response.questionID == responseKeys[1]) && 
      (response.response.responseId == responseKeys[2])){
        return true;
      }
      return false;
    });
    
    console.log("confirmDeleteResponse: responseObject");
    console.log(response);
    this.setState({showDeleteResponseModal : true, editRowId: rowId, responseItem : response});
    console.log("Deleting a response");
  }

  /* 
    Name: deleteResponse
    Purpose: Deletes a response from the database given the response object
  */
  deleteResponse = (body) => {
    this.removeResponse(body);
  }

  /* 
    Name: RemoveResponse
    Purpose: Makes a call to delete the response.
  */
  removeResponse = async (body) => {
    const url = '/responses/'
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: 'DELETE',
        body: JSON.stringify(body)}); 
    const msg = await res.text();
    if (res.status == 200) {
      this.props.getQuestions();
      return 1;
    } else {
      console.log(res);
      console.log(msg);
      console.log("deleteResponse: ERROR");
      return 0;
    }
  }

  /* 
    Name: SearchResponseTable
    Purpose: Given a search query, it searches for responses/questions that contain that search query.
  */
  searchResponseTable = (event) => {
    if(event.keyCode === 13){
      event.preventDefault();
    
      // Do some reduction to only display the elements that match that searchKey -- Responses ONLY not questions.
      if(this.state.searchKey.length > 0){
        this.onSearch(this.state.searchKey);
      }
      else{
        this.setState({
          responses : this.props.responses
        }); 
      }
    }
  }

  /* 
    Name: onSearch
    Purpose: Looks for rows that contain the searchTerm by concatenting the text
              for each column except the view/delete columns
  */
  onSearch = (searchTerm) => {
    var oldResponses = this.props.responses;
    var newResponses = [];
    oldResponses.forEach((response) => {
      var rowString = "";
      rowString += response.responseType;
      rowString += response.question.questionText + " ";
      rowString += response.response.responseDateTime + " ";
      rowString += response.response.surveyResponse + " ";

      if(rowString.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1){
        newResponses.push(response);
      }
    });

    this.setState({
      responses : newResponses
    }); 
  }

  /* SORT METHODS FOR THE TABLE */

  /* 
    Name: sortTable
    Purpose: Sorts the response object given the compareFunction or the kind of 
      sorting we are doing function
  */
  sortTable = (searchCriterionCallBack) =>{
    return this.state.responses.sort(searchCriterionCallBack);
  }

  /* 
    Name: onSearchKeyChange
    Purpose: Updates the searchTerm when it changes
  */
  onSearchKeyChange = (event) => {
    this.setState({searchKey : event.target.value});
  }

  /* 
    Name: sortByDate
    Purpose: Sorts the responses by comparing the date the responses were made
  */
  sortByDate = (event) => {
    event.preventDefault();

    var newResponses = this.sortTable((valueA, valueB) => {
      if(valueA == null || valueB == null){
        if(valueA == null){
          return this.state.sortDateInOrder ? -1 : 1;
        }
        else if(valueB == null){
          return this.state.sortDateInOrder ? 1 : -1;
        }
      }

      if (valueA.response.responseDateTime < valueB.response.responseDateTime) {
        return this.state.sortDateInOrder ? -1 : 1;
      }
      if (valueA.response.responseDateTime > valueB.response.responseDateTime) {
        return this.state.sortDateInOrder ? 1 : -1;
      }
      return 0;
    });
    
    this.setState({
      responses : newResponses,
      sortDateInOrder : !this.state.sortDateInOrder
    });
  }

  /* 
    Name: sortByQuestion
    Purpose: Sorts the responses by comparing the question text.[Actual question]
  */  
  sortByQuestion = (event) => {
    event.preventDefault();

    var newResponses = this.sortTable((valueA, valueB) => {
      if(valueA == null || valueB == null){
        if(valueA == null){
          return this.state.sortQuestionInOrder ? -1 : 1;
        }
        else if(valueB == null){
          return this.state.sortQuestionInOrder ? 1 : -1;
        }
      }

      if (valueA.question.questionText < valueB.question.questionText) {
        return this.state.sortQuestionInOrder ? -1 : 1;
      }
      if (valueA.question.questionText > valueB.question.questionText) {
        return this.state.sortQuestionInOrder ? 1 : -1;
      }
      return 0;
    });
    
    this.setState({
      responses : newResponses,
      sortQuestionInOrder : !this.state.sortQuestionInOrder
    });
  }

  /* 
    Name: sortByResponseType
    Purpose: Sorts the responses by comparing whether the responses are individual or group.
  */
  sortByResponseType = (event) => {
    event.preventDefault();

    var newResponses = this.sortTable((valueA, valueB) => {
      if(valueA == null || valueB == null){
        if(valueA == null){
          return this.state.sortResponseTypeInOrder ? -1 : 1;
        }
        else if(valueB == null){
          return this.state.sortResponseTypeInOrder ? 1 : -1;
        }
      }

      if (valueA.responseType < valueB.responseType) {
        return this.state.sortResponseTypeInOrder ? -1 : 1;
      }
      if (valueA.responseType > valueB.responseType) {
        return this.state.sortResponseTypeInOrder ? 1 : -1;
      }
      return 0;
    });
    
    this.setState({
      responses : newResponses,
      sortResponseTypeInOrder : !this.state.sortResponseTypeInOrder
    });
  }

  /* 
    Name: sortByResponse
    Purpose: Sorts the responses by comparing the responses [Alphabet].
  */  
  sortByResponse = (event) => {
    event.preventDefault();

    var newResponses = this.sortTable((valueA, valueB) => {
      if(valueA == null || valueB == null){
        if(valueA == null){
          return this.state.sortResponseInOrder ? -1 : 1;
        }
        else if(valueB == null){
          return this.state.sortResponseInOrder ? 1 : -1;
        }
      }

      if (valueA.response.surveyResponse < valueB.response.surveyResponse) {
        return this.state.sortResponseInOrder ? -1 : 1;
      }
      if (valueA.response.surveyResponse > valueB.response.surveyResponse) {
        return this.state.sortResponseInOrder ? 1 : -1;
      }
      return 0;
    });
    
    this.setState({
      responses : newResponses,
      sortResponseInOrder : !this.state.sortResponseInOrder
    });        
  }

  //render--render the entire responses table with header, displaying a "No
  //Responses made" message in case the table is empty.
  render() {
    return(
    <div id="responseTableMode" className="padded-page">
      <h1></h1>
      <div className="input-group center-search" style={{justifyContent: "center", paddingBottom: "20px"}}>
             <span className="input-group-prepend">
                 <div className="input-group-text bg-transparent border-right-0">
                   <i className="fa fa-search"></i>
                </div>
             </span>
             <input className="form-control py-2 border-left-0 border" placeholder="Search responses" type="search" value={this.state.searchKey} id="searchResponses"
             onKeyUp={this.searchResponseTable} onChange={this.onSearchKeyChange}/>
      </div>     
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th><span id="responseSortQuestionType" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByResponseType}></span>&nbsp;Response type </th>
          <th><span id="responseSortQuestion" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByQuestion}></span>&nbsp;Question</th>
          <th><span id="responseSortDate" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByDate}></span>&nbsp;Response Date-Time</th>
          <th><span id="responseSortResponse" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByResponse}></span>&nbsp;Response</th>
          <th>View</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody id="responseTableBody">
          {Object.keys(this.props.responses).length === 0 ? 
          <tr>
          <td colSpan="5" style={{fontStyle: "italic"}}>No responses made</td>
          </tr> : this.renderResponseTable(this.state.responses)
          }
        </tbody>
      </table>
      {
        this.state.showResponseModal ?
        <ViewResponse
          closeResponse={() => {this.props.getQuestions(); this.setState({showResponseModal : false})}}
          responseItem={this.state.responseItem}
        >
        </ViewResponse> :
        null
      }
      {this.state.showDeleteResponseModal ?
        <DeleteResponseModal 
          closeDeleteResponseModal={() => {this.props.getQuestions(); this.setState({showDeleteResponseModal: false})}}
          responseItem={this.state.responseItem}
          deleteResponse={this.deleteResponse} /> : null
        }
    </div>
    );
  }
}

export default SubmittedResponse;
