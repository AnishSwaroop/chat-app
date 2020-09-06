import React, { Component } from 'react'
import getImageUrl from '../Utils/Utilities'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
  }

  handleClick = (event) => {
    this.props.showPic(this.props.name);
  }

  toggleMenu = () => {
    const menu = this.state.showMenu;
    this.setState({showMenu : !menu});
  }

  logout = () => {
    if(this.props.name) {
      this.toggleMenu();
      this.props.logout();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="header-app">
          <nav className="navbar navbar-dark  indigo darken-2">
            {this.props.name && getImageUrl(this.props.userList,this.props.name) !== "noprofile.jpg" ? <img onClick={this.handleClick} className="App-header-img" src={getImageUrl(this.props.userList,this.props.name)} /> : ""}
            <div className="navbar-brand header-text" href="#">{this.props.name ? `Welcome ${this.props.name}` : "Chat Application"}</div>
            <div className="menu-btn-border navbar-toggler third-button" type="button" onClick = {this.toggleMenu}>
              <div className={this.state.showMenu ? "animated-icon3 open" : "animated-icon3"}><span></span><span></span><span></span></div>
            </div>
            <div className={this.state.showMenu ? "navbar-collapse collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent22">
              <ul className="navbar-nav mr-auto">
                <li className={this.props.name ? "nav-item active" : "nav-item"}>
                  <div className="nav-link" onClick = {this.logout}>Logout <span className="sr-only">(current)</span></div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
export default Header;