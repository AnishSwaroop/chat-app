import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      inValidUser: false
    }
  }

  handleUsernameChange = (event) => {
    this.setState({ name: event.target.value, inValidUser: false });

  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value, inValidUser: false });
  }

  handleClick = (event) => {
    const validUsers = this.props.validUserList;
    let name = this.state.name;
    name = name === "Anish" ? "Anish_Z" : name;
    let type = "";
    if (name.indexOf('_') > 0) {
      type = name.split('_')[1];
      name = name.split('_')[0];
    }
    let userRow = validUsers.filter((user) => {
      if (user.username === name) return user;
    });
    if (userRow && userRow[0] && userRow[0].password === this.state.password) {
      type = type ? type : userRow[0].type;
      this.props.setUserDetails(name, type);
    }
    else {
      this.setState({ inValidUser: true });
    }

  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="container App-login">
            <div className="row">
              <div className="col-md-5 mx-auto">
                <div className="myform form ">
                  <div className="logo mb-3">
                    {this.state.inValidUser ? <div className="alert alert-danger" role="alert">Incorrect credentials</div> : ""}
                    <div className="col-md-12 text-center">
                      <h1>Login</h1>
                    </div>
                    <form action="" method="post" name="login">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="username" className="form-control" id="username" placeholder="Enter name" value={this.state.name} onChange={this.handleUsernameChange} />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" id="password" value={this.state.password} className="form-control" placeholder="Enter password" onChange={this.handlePasswordChange} />
                      </div>
                      <div className="form-group">
                        <p className="text-center">By signing in you accept Anish's <a href="#">Terms Of Use</a></p>
                      </div>
                      <div className="col-md-12 text-center ">
                        <button type="button" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.handleClick} disabled={!this.state.name || !this.state.password}>Login</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;