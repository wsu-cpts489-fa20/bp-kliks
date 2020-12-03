import React from 'react';

class SearchSurveys extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
      };
    }
  
    //render--render the entire responses table with header, displaying a "No
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
            <th><span id="responseSortQuestionType" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByResponseType}></span>&nbsp;Survey ID </th>
            <th><span id="responseSortQuestion" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByQuestion}></span>&nbsp;Survey Title</th>
            <th><span id="responseSortDate" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByDate}></span>&nbsp;Survey Creation Date</th>
            <th><span id="responseSortResponse" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByResponse}></span>&nbsp;Course ID</th>
            <th><span id="responseSortResponse" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByResponse}></span>&nbsp;Number of Questions</th>
            {/* <th>View</th> */}
            <th>Delete</th>
          </tr>
          </thead>
          <tbody id="searchSurveyTableBody">
            <td colSpan="5" style={{fontStyle: "italic"}}>No surveys created</td>
          </tbody>
        </table>
      </div>
      );
    }
  }
  
  export default SearchSurveys;