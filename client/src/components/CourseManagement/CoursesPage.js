import React from 'react';
import SearchField from 'react-search-field'

class CoursesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCourse = "",
        };
    }

    render() {
        return (
            <div className="padded-page">
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
                    <th>Course Name</th>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Instructor Name</th>
                    <th>View Students</th>
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

export default CoursesPage;