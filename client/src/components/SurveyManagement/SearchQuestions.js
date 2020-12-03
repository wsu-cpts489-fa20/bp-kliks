import React from 'react';
import SearchField from 'react-search-field'
//import ConfirmDeleteRound from './ConfirmDeleteRound.js';
// import AppMode from './../AppMode.js';
import Switch from "react-switch";

class SubmittedResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false ,
          showConfirmDelete: false};
    this.handleChange = this.handleChange.bind(this);
  }


    //called when the toggle button is clicked
    handleChange(checked) {
      this.setState({ checked });
    }

    onSearchClicked = () => {
        console.log("onSearchClicked");
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

    renderTable = () => {
      let table = [];
      for (const r in this.props.question) {
        table.push(
          <tr key={r}>
            <td>{this.props.question[r].questionTitle}</td>
            <td>{this.props.question[r].questionText}</td>
            <td>{this.props.question[r].questionAnswers}</td>
            <td>{this.props.question[r].questionActive}</td>
            <td><button onClick={this.props.menuOpen ? null : null}>
                  <span className="fa fa-eye"></span></button></td>
            <td><button onClick={this.props.menuOpen ? null : 
              null}>
                  <span className="fa fa-trash"></span></button></td>
          </tr> 
        );
      }
      return table;
      }
  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page">
      <center>
      <h1>Questions Baby!</h1>
      <label htmlFor="normal-switch">
        <span><h1>Active Question</h1></span>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          id="normal-switch"
        />
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
          <th>Title</th>
          <th>Question</th>
          <th>Answer Type</th>
          <th>Is Active</th>
          <th>View/Edit...</th>
          <th>Delete</th>
        </tr>
        </thead>
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