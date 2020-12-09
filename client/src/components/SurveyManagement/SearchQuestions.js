import React from 'react';
import SearchField from 'react-search-field'
//import ConfirmDeleteRound from './ConfirmDeleteRound.js';
// import AppMode from './../AppMode.js';

class SubmittedResponse extends React.Component {
  constructor(props) {
    super(props);
  }

    onSearchClicked = () => {
        console.log("onSearchClicked");
    }
  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page" id={"searchQuestionsMode"}>
      <center>
      <h1></h1>
        
         <div className="input-group center-search" style={{justifyContent: "center", paddingBottom: "20px"}}>
            <SearchField
              classNames="search-width"
              placeholder="Search question"
              onSearchClick={this.onSearchClicked}
          />
             {/* <span className="input-group-prepend">
                 <div className="input-group-text bg-transparent border-right-0"><i className="fa fa-search"></i></div>
             </span>
             <input className="form-control py-2 border-left-0 border" placeholder="Search Rounds" type="search" value="" id="searchRounds"
             onkeyup="searchRoundsTable(this.value)" onSearch onsearch="searchRoundsTable(this.value)"/> */}
         </div>
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th>Question Title</th>
          <th>Question</th>
          <th>Answer Type</th>
          <th>View/Edit...</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      </center>
    </div>
    );
  }
}

export default SubmittedResponse;