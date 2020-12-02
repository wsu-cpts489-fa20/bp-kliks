import React from 'react';
import SearchField from 'react-search-field'
//import ConfirmDeleteRound from './ConfirmDeleteRound.js';
// import AppMode from './../AppMode.js';

class SubmittedResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ActiveFilter: false};
  }

  onSearchClicked = () => {
      console.log("onSearchClicked");
  }

  switchHandler = () => {
    console.log(this.state.ActiveFilter);
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
    <div className="padded-page">
      <center>
      <h4>Question Filter (Active Only or All Questions): </h4>  
      <label class="switch"><input type="checkbox" id="togBtn" onClick={this.switchHandler}/>
        <div class="slider round">
        <span class="on">Active</span><span class="off">All</span>
        </div>
      </label>

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