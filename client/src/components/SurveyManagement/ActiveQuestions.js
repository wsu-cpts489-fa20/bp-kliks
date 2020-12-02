import React from 'react';

class ActiveQuestions extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <div className="padded-page">
          <center>
          <h1></h1>
          <table className="table table-hover">
            <thead className="thead-light">
            <tr>
              <th>Question Title</th>
              <th>Question</th>
              <th>Answer Type</th>
              <th>View/Edit...</th>
              <th>Delete</th>
              <th>Deactivate</th>
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

export default ActiveQuestions;