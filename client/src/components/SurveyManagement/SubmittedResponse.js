import React from 'react';
import { async } from 'regenerator-runtime';
import DeleteResponseModal from './DeleteResponseModal';
import ViewResponse from './viewResponseModal';


class SubmittedResponse extends React.Component {
  constructor() {
    super();
    this.state = {
      questions : [],
      allResponses : [],
      showResponseModal : false,
      showConfirmDelete: false,
      editRowId: "",
      responseItem : {},
      searchKey : "",
      showDeleteResponseModal : false
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    // const url = '/responses/' + this.props.userObj.id;
    // const res = await fetch(url, {
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },
    //     method: 'GET',
    //     body: JSON.stringify({"courses": ["cpts489Fall2020"]})}); 
    // const msg = await res.text();
    // if (res.status == 200) {
    //   console.log("getQuestions: SUCCESS");
    //   console.log(res);
    //   console.log(msg);
    // } else {
    //   console.log(res);
    //   console.log(msg);
    //   console.log("getQuestions: ERROR");
    // }

  // var newResponse = {
  //   "students": [
  //     {
  //       "userID": "marco.arceo@wsu.edu",
  //       "studentDisplayName": "marco.arceo@wsu.edu"
  //     }],
  //   "responseId": "rID55",
  //   "responseDateTime": "Wed Nov 12 2020 14:19:12 GMT-0800",
  //   "surveyResponse": "Choice 5"
  // }

  // var newData = {
  //   "response" : newResponse,
  //   "questionID": "questionID1",
  //   "courseID": "cpts489Fall2020",
  //   "surveyID": "testID",
  // }


  //   const url = '/responses/';// + this.props.userObj.id;
  //   const res = await fetch(url, {
  //       headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //           },
  //       method: 'POST',
  //       body: JSON.stringify(newData)}); 
  //   const msg = await res.text();
  //   if (res.status == 200) {
  //     console.log("getQuestions: SUCCESS");
  //     console.log(res);
  //     console.log(msg);
  //   } else {
  //     console.log(res);
  //     console.log(msg);
  //     console.log("getQuestions: ERROR");
  //   }

    let response = await fetch("/responses/" + this.props.userObj.id+"/"+["cpts489Fall2020"]);
    response = await response.json();
      console.log("getQuestions: RESPONSE");
    const obj = JSON.parse(response);

    console.log("GET /responses/"+ this.props.userObj.id);
    console.log(obj);


    this.setState({
      questions : obj
    }, () => {
      this.getAllResponses();
    });
  }

  getAllResponses = () => {
    if(this.state.questions.length == 0){
      return [];
    }

    console.log("getAllResponses");
    console.log(this.state.questions);

    var responses = [];

    this.state.questions.forEach((survey) => {
      var allQuestions = survey.questions;
      console.log("Questions");
      console.log(allQuestions);

      allQuestions.forEach((question) => {
        console.log(question);
        responses.push({
          questionID: question.questionID,
          surveyID: survey.surveyID,
          responses: question.responses
        });
      });
    });

    console.log("all responses:");
    console.log(responses);
    this.setState({
      allResponses : responses
    });
  }


  //renderResponseTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  renderResponseTable = () => {
  let table = [];
  console.log("renderResponseTable");
  console.log(this.state.allResponses);
  this.state.allResponses.forEach((question)=>{
    var index = 0;
    question.responses.forEach((response)=>{
      table.push(
        <tr key={question.surveyID+"-"+question.questionID+"-"+response.responseId+"-"+index}>
          <td>{response.students.length > 1 ? "Group" : "Individual"}</td>
          <td>{question.questionID}</td>
          <td>{response.responseDateTime}</td>
          <td>{response.surveyResponse}</td>
          <td><button onClick={this.props.menuOpen ? null : () => 
          this.viewResponse(question.surveyID+"-"+question.questionID+"-"+response.responseId+"-"+index)}>
              <span className="fa fa-eye"></span></button></td>
          <td><button onClick={this.props.menuOpen ? null : 
          () => this.confirmDeleteResponse(question.surveyID+"-"+question.questionID+"-"+response.responseId+"-"+index)}>
              <span className="fa fa-trash"></span></button></td>
        </tr>
      );
      index++;     
    });
    index = 0;
  });

  return table;
  }


  viewResponse = (rowId) => {
    console.log("viewResponse: rowId");
    console.log(rowId);

    let responseKeys = this.parseResponseRowId(rowId);    

    var response = this.getResponseItem(responseKeys);
    
    console.log("viewResponse: responseObject");

    console.log(response);

    this.setState({showResponseModal : true, editRowId: rowId, responseItem : response});

    console.log("Viewing a response");
  }

  parseResponseRowId = (id) => {
    let keys = id.split("-");
    console.log("Keys");
    console.log(keys);
    return keys;
  }

  getResponseItem = (responseKeys) => {

    var toReturn = {};

    this.state.questions.forEach((survey) => {
      if(survey.surveyID == responseKeys[0]){
        var allQuestions = survey.questions;
        console.log("getResponseItem-Survey");
        console.log(survey);
        // console.log(allQuestions);

        allQuestions.forEach((question) => {
          console.log("getResponseItem-Question");
          console.log(question);
          if(question.questionID == responseKeys[1]){
            var questionResponses = question.responses;
            questionResponses.forEach((response) => {
              console.log("getResponseItem-response");
              console.log(response);
              if(response.responseId == responseKeys[2]){
                console.log("matchFound");
                toReturn =  {
                  question: question,
                  survey: survey,
                  response: response
                };
                return;
              }
            });
          }
        });
      }
    });

    return toReturn;
  }

  confirmDeleteResponse = (rowId) => {
    console.log("confirmDeleteResponse: rowId");
    console.log(rowId);

    let responseKeys = this.parseResponseRowId(rowId);    

    var response = this.getResponseItem(responseKeys);
    
    console.log("confirmDeleteResponse: responseObject");

    console.log(response);

    this.setState({showDeleteResponseModal : true, editRowId: rowId, responseItem : response});

    
    console.log("Deleting a response");
  }

  deleteResponse = (body) => {
    if(this.removeResponse(body)){
      console.log("GOOD");
    }

    console.log("ERROR");
  }

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
      console.log("deleteResponse: SUCCESS");
      console.log(res);
      console.log(msg);
      return 1;
    } else {
      console.log(res);
      console.log(msg);
      console.log("deleteResponse: ERROR");
      return 0;
    }
  }

  searchResponseTable = (event) => {
    if(event.keyCode === 13){
      event.preventDefault();
    
      // Do some reduction to only display the elements that match that searchKey -- Responses ONLY not questions.
      console.log("SEARCH for responses");
    }
  }

  onSearchKeyChange = (event) => {
    this.setState({searchKey : event.target.value});
  }

  sortByDate = (event) => {
    event.preventDefault();

    console.log("sort responses by date");
  }

  sortByQuestion = (event) => {
    event.preventDefault();

    console.log("sort responses by question");
  }

  sortByQuestionType = (event) => {
    event.preventDefault();

    console.log("sort responses by question type");
  }

  sortByResponse = (event) => {
    event.preventDefault();

    console.log("sort responses by response");
  }

  //render--render the entire responses table with header, displaying a "No
  //Responses Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page">
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
          <th><span id="responseSortQuestionType" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByQuestionType}></span>&nbsp;Question type </th>
          <th><span id="responseSortQuestion" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByQuestion}></span>&nbsp;Question</th>
          <th><span id="responseSortDate" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByDate}></span>&nbsp;Response Date-Time</th>
          <th><span id="responseSortResponse" style={{cursor:"pointer"}} className="fa fa-sort" onClick={this.sortByResponse}></span>&nbsp;Response</th>
          <th>View</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {Object.keys(this.state.allResponses).length === 0 ? 
          <tr>
          <td colSpan="5" style={{fontStyle: "italic"}}>No responses made</td>
          </tr> : this.renderResponseTable()
          }
        </tbody>
      </table>
      {
        this.state.showResponseModal ?
        <ViewResponse
          closeResponse={() => this.setState({showResponseModal : false})}
          responseItem={this.state.responseItem}
        >
        </ViewResponse> :
        null
      }
      {this.state.showDeleteResponseModal ?
        <DeleteResponseModal 
          closeDeleteResponseModal={() => this.setState({showDeleteResponseModal: false})}
          responseItem={this.state.responseItem}
          deleteResponse={this.deleteResponse} /> : null
        }
    </div>
    );
  }
}

export default SubmittedResponse;
