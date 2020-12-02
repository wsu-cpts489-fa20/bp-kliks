import React from 'react';
import AppMode from './../AppMode.js'
import App from './App.js';

class SideMenu extends React.Component {

  setGeneralMode = (mode) => {
    if(AppMode.SURVEY_MANAGEMENT === mode|| AppMode.SURVEY_MANAGEMENT_CREATE === mode || AppMode.SURVEY_MANAGEMENT_RESPONSES === mode || AppMode.SURVEY_MANAGEMENT_SEARCH === mode){
      return AppMode.SURVEY_MANAGEMENT;
    } else {
      return mode;
    }
  }
  
//renderModeItems -- Renders correct subset of mode menu items based on
//current mode, which is stored in this.prop.mode. Uses switch statement to
//determine mode.
renderModeMenuItems = () => {
  const mode = this.setGeneralMode(this.props.mode);
  switch (mode) {
    case AppMode.SURVEY_MANAGEMENT || AppMode.SURVEY_MANAGEMENT_CREATE || AppMode.SURVEY_MANAGEMENT_RESPONSES  || AppMode.SURVEY_MANAGEMENT_SEARCH:
      return(
        <div>
        <a className="sidemenu-item" id="surveyManagement-MainPage" onClick={(e) => { 
          e.preventDefault();
          this.props.changeMode(AppMode.SURVEY_MANAGEMENT);
          }}>
            <span className="fa fa-bolt"></span>&nbsp;Active Questions</a>
        <a className="sidemenu-item " id="surveyManagement-search" onClick={(e) => { 
          e.preventDefault();
          this.props.changeMode(AppMode.SURVEY_MANAGEMENT_SEARCH);
          }}>
            <span className="fa fa-search"></span>&nbsp;Search Questions</a>
        <a className="sidemenu-item " id="surveyManagement-create" onClick={(e) => { 
          e.preventDefault();
          this.props.changeMode(AppMode.SURVEY_MANAGEMENT_CREATE);
          }}>
            <span className="fa fa-plus"></span>&nbsp;Create Questions</a>
        <a className="sidemenu-item " id="surveyManagement-responses" onClick={(e) => { 
          e.preventDefault();
          this.props.changeMode(AppMode.SURVEY_MANAGEMENT_RESPONSES);
          }}>
            <span className="fa fa-folder-open"></span>&nbsp;Responses</a>           
        </div>
      );
    break;
    case AppMode.ROUNDS:
      return(
        <div>
          <a className="sidemenu-item">
            <span className="fa fa-plus"></span>&nbsp;Log New Round</a>
          <a className="sidemenu-item">
            <span className="fa fa-search"></span>&nbsp;Search Rounds</a>
        </div>
      );
    break;
    case AppMode.COURSES:
    case AppMode.COURSE_CREATE:
      if (this.props.userType === "Instructor"){
        return(
          <div>
          <a className="sidemenu-item" onClick={(e) => { 
          e.preventDefault();
          this.props.changeMode(AppMode.COURSES);
          }}>
              <span className="fa fa-folder-open" id="viewCoursesLink"></span>&nbsp;View Courses</a>
          <a className="sidemenu-item" onClick={(e) => { 
          e.preventDefault();
          this.props.changeMode(AppMode.COURSE_CREATE);
          }}>
              <span className="fa fa-plus" id="addCourseLink"></span>&nbsp;Add a Course</a>
          </div>
        );
      } else {
        return(
          <div>
          <a className="sidemenu-item" onClick={(e) => { 
          e.preventDefault();
          this.props.changeMode(AppMode.COURSES);
          }}>
              <span className="fa fa-folder-open" id="viewCoursesLink"></span>&nbsp;View Courses</a>
          </div>
        );
      }
      break;
      case AppMode.STUDENTS:
      case AppMode.STUDENTS_CREATE:
      case AppMode.STUDENTS_UPLOAD:
        if (this.props.userType === "Instructor"){
          return(
            <div>
            <a className="sidemenu-item" onClick={(e) => { 
            e.preventDefault();
            this.props.changeMode(AppMode.COURSES);
            }}>
                <span className="fa fa-folder-open" id="viewCoursesLink"></span>&nbsp;View Courses</a>
            <a className="sidemenu-item" onClick={(e) => { 
            e.preventDefault();
            this.props.changeMode(AppMode.STUDENTS_CREATE);
            }}>
                <span className="fa fa-plus" id="addStudentLink"></span>&nbsp;Add a Student</a>
            <a className="sidemenu-item" onClick={(e) => { 
            e.preventDefault();
            this.props.changeMode(AppMode.STUDENTS_UPLOAD);
            }}>
                <span className="fa fa-upload" id="uploadStudentsLink"></span>&nbsp;Upload Students</a>
            </div>
          );
        } else {
          return(
            <div>
            <a className="sidemenu-item" onClick={(e) => { 
            e.preventDefault();
            this.props.changeMode(AppMode.COURSES);
            }}>
                <span className="fa fa-folder-open" id="viewCoursesLink"></span>&nbsp;View Courses</a>
            </div>
          );
        }
      break;
    default:
        return null;
    }
}

    render() {
       return (
        <div id="sidemenu" className={"sidemenu " + (this.props.menuOpen ? "sidemenu-open" : "sidemenu-closed")}
             onClick={this.props.toggleMenuOpen}>
          {/* SIDE MENU TITLE */}
          <div className="sidemenu-title">
            <img src={this.props.profilePicURL} height='60' width='60' />
            <span id="userID" className="sidemenu-userID">&nbsp;{this.props.displayName}</span>
        </div>
          {/* MENU CONTENT */}
          {this.renderModeMenuItems()}
          {/* The following menu items are present regardless of mode */}
          {this.props.localAccount ? 
            <a id="accountBtn" className="sidemenu-item" onClick={this.props.editAccount}>
              <span className="fa fa-user"></span>&nbsp;Account</a> : null}
          <a id="aboutBtn" className="sidemenu-item" onClick={this.props.showAbout}>
            <span className="fa fa-info-circle"></span>&nbsp;About</a>
          <a id="logOutBtn" className="sidemenu-item" onClick={this.props.logOut}>
            <span className="fa fa-sign-out-alt"></span>&nbsp;Log Out</a>
        </div>
       );
    }
}

export default SideMenu;
