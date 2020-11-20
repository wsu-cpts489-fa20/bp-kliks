import React from 'react';
import AppMode from '../AppMode';
import logo from '../favicon.png'; //Importing the logo from the src directory

class NavBar extends React.Component {

  getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.ROUNDS_LOGROUND || 
          this.props.mode === AppMode.ROUNDS_EDITROUND)
          return "fa fa-arrow-left";
      if (this.props.menuOpen)
        return "fa fa-times";
      return "fa fa-bars";
  }

  handleMenuBtnClick = () => {
    if (this.props.mode === AppMode.ROUNDS_LOGROUND ||
        this.props.mode === AppMode.ROUNDS_EDITROUND) {
      this.props.changeMode(AppMode.ROUNDS);
    } else if (this.props.mode != AppMode.LOGIN) {
      this.props.toggleMenuOpen();
    }
  }

  // Directly added the logo from the src directory since importing it from onedrive was causing complications
  // where the image would not load correctly
  render() {
    return (
    <div id="navBarMenu" className="navbar">  
    <span className="navbar-items">
      <button id="menuBtn" className="sidemenu-btn" onClick={this.handleMenuBtnClick}>
        <span id="menuBtnIcon" className={"sidemenu-btn-icon " + this.getMenuBtnIcon()}>
        </span>
      </button>
      <img src={logo} alt="Kliks Logo" height="38px"
      width="38px" />
      <span className="navbar-title">
        &nbsp;{this.props.title}
      </span>
    </span>
  </div>
); 
}
}

export default NavBar;
