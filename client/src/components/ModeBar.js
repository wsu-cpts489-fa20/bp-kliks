import React from 'react';
import AppMode from '../AppMode.js';


class ModeBar extends React.Component {
    render() {
      return(
        <div className={"modebar" + (this.props.mode === AppMode.LOGIN ? 
          " invisible" : (this.props.menuOpen ? " ignore-click visible" : " visible"))}>
        <a className={(this.props.mode === AppMode.SURVEY_MANAGEMENT ? " item-selected" : null)}
            onClick={()=>this.props.changeMode(AppMode.SURVEY_MANAGEMENT)}>
          <span className="modebaricon fa fa-th-list"></span>
          <span className="modebar-text">Survey Management</span>
        </a>
        <a className={(this.props.mode === AppMode.ROUNDS || 
               this.props.mode === AppMode.ROUNDS_EDITROUND || 
               this.props.mode === AppMode.ROUNDS_LOGROUND ? 
                  " item-selected" : null)}
           onClick={()=>this.props.changeMode(AppMode.ROUNDS)}>
          <span className="modebar-icon  fa fa-history"></span>
          <span className="modebar-text">Dashboard</span>
        </a>
        <a className={(this.props.mode === AppMode.COURSES ? " item-selected" : null)}
          onClick={()=>this.props.changeMode(AppMode.COURSES)}>
          <span className="modebar-icon  fa fa-flag"></span>
          <span className="modebar-text">Courses</span>
        </a> 
        </div>
      );
    }
}

export default ModeBar;
