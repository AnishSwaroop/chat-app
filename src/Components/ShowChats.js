import React, { Component } from 'react'
import getImageUrl from '../Utils/Utilities'

class ShowChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length > prevProps.messages.length) {
      this.scrollToBottom();
      this.props.messages.length > 0 && this.props.audio && this.props.audio.play();
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom(elem) {
    elem && window.scrollTo(0, elem.scrollHeight);
    if (this.state.showSpinner && this.props.messages && this.props.messages.length > 0)
      this.setState({ showSpinner: false });
  }

  handleClick = (name) => {
    this.props.showPic(name);
  }

  showSpinner = () => {
    return (
      <div className="App-show-chat">
        <div className="d-flex justify-content-center App-spinner">
          <div className="spinner-grow App-spinner-design" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  showChats = (type, messageListGroup, userList) => {
    return (
      <div className="App-show-chat" ref={(elem) => (this.scrollToBottom(elem))}>
        {type &&
          messageListGroup.map(
            (messageObj, index) => {
              if (messageObj.type === type)
                return (
                  <div key={index} className={index % 2 === 0 ? "App-message-even" : "App-message-odd"}>
                    <img className="App-chat-img" src={getImageUrl(userList, messageObj.name)} onClick={() => this.handleClick(messageObj.name)} />
                    <div className="App-name">{messageObj.name} says : </div>
                    <div className="App-message">{messageObj.message}</div>
                    <div className="App-date">{this.convertedDateTime(messageObj.dateTime)}</div>
                  </div>
                )
            }
          )
        }
      </div>
    );
  }

  convertedDateTime = (timeString) => {
    const d = new Date(timeString);
    const dFormat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/');
    const dateTime = dFormat + ' ' + d.toLocaleTimeString();
    return dateTime;
  }

  render() {
    const { messages, type, userList } = this.props;
    const messageListGroup = [];
    messages.map((messageObj) => {
      if (messageObj.type === type) {
        messageListGroup.push(messageObj);
      }
    });
    return (
      <React.Fragment>
        {type === "Z" && <div className="App-show-chat">You are not ANISH! You Cant be!!! Anyway logout and login with your own Credentials</div>}
        {this.state.showSpinner && this.showSpinner()}
        {!this.state.showSpinner && this.showChats(type, messageListGroup, userList)}
      </React.Fragment>
    )
  }
}

export default ShowChat;
