import React, { Component } from 'react'

class EnterChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageObj: {},
      isTyping: false
    }
    this.name = this.props.name;
  }

  handleChange = (event) => {
    let isTyping = event.target.value ? true : false;
    this.props.isTyping(isTyping);
    this.setState({ isTyping: isTyping });
    const d = new Date();
    const dateTime = d.toUTCString();
    this.setState({
      messageObj: {
        name: this.name,
        message: event.target.value,
        dateTime: dateTime,
        type: this.props.type
      }
    });
  }

  handleClick = () => {
    if (this.state.messageObj.message) {
      this.props.setMessage(this.state.messageObj);
      this.props.isTyping(false);
      this.setState({ isTyping: false });
      this.setState({
        messageObj: {
          name: this.name,
          message: '',
          date: '',
          type: this.props.type
        }
      });
    }
  }

  render() {
    const { isTyping } = this.state;
    const { name } = this.props;
    return (
      <React.Fragment>
        {this.props.type !== "Z" ?
          <div className="App-enter-chat">
            <form>
              <div className="form-group">
                <label>Enter Message</label>
                <textarea placeholder="Enter your message..." className="form-control" id="enter-message" rows="2" onChange={this.handleChange} value={this.state.messageObj.message}></textarea>
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleClick} disabled={!this.state.messageObj.message}>Send</button>
              </div>
              <div className="App-typing" >{isTyping ? `${name} is Typing...` : ""}</div>
            </form>
          </div>
          : ""}
      </React.Fragment>
    )
  }
}

export default EnterChat;