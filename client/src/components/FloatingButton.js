import React from 'react';

class FloatingButton extends React.Component {
    render() {
      return(
        <div className={(this.props.upload ? "floatbtn-upload" : "floatbtn")} onClick={this.props.handleClick}>
          <span className={(this.props.upload ? "floatbtn-icon fa fa-upload" : "floatbtn-icon fa fa-plus")}></span>
        </div>  
      );
    }
}

export default FloatingButton;
