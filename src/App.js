import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import EnterChat from './Components/EnterChat';
import ShowChats from './Components/ShowChats';
import Login from './Components/Login';
import ShowPicModal from './Modal/ShowPicModal';
import soundUrl from './Audio/notification.mp3'

import firebase from './firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.type = "";
    this.audio = new Audio(soundUrl);
    this.initialiseState = {
      message: '',
      messageList: [],
      isTyping: false,
      name: '',
      validUserList: [],
      showPic: false,
      picName: ""
    };
    this.state = this.initialiseState;
  }

  componentDidMount() {
    this.initialiseDatabaseContent();
    if(sessionStorage.getItem('name') && sessionStorage.getItem('type') ) {
      this.setState({ name: sessionStorage.getItem('name') });
      this.type = sessionStorage.getItem('type');
      this.audio = new Audio(soundUrl);
    }
  }

  initialiseDatabaseContent = () => {
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      this.setState({ validUserList: snapshot.val() });
    });
    const chatsRef = firebase.database().ref('chats');
    chatsRef.on('value', (snapshot) => {
      this.setState({ messageList: snapshot.val() });
    });
  }

  setMessage = (message) => {
    let messageList = this.state.messageList;
    messageList.push(message);
    this.setState({ messageList: messageList });
    firebase.database().ref('chats').set(messageList);
  }

  isTyping = (isTypingFlag) => {
    this.setState({ isTyping: isTypingFlag });
  }

  setUserDetails = (name, type) => {
    this.setState({ name: name });
    this.type = type;
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('type', type);
  }

  showPic = (name) => {
    this.setState(
      {
        showPic: true,
        picName: name
      }
    );
  }

  closePic = () => {
    this.setState({ showPic: false });
  }

  logout = () => {
    sessionStorage.clear();
    this.setState(this.initialiseState);
    this.initialiseDatabaseContent();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showPic && this.state.picName && <ShowPicModal name={this.state.picName} closePic={this.closePic} userList={this.state.validUserList} />}
        <div className="App">
          <Header name={this.state.name} showPic={this.showPic} userList={this.state.validUserList} logout={this.logout} />
          {!this.state.name && <Login setUserDetails={this.setUserDetails} validUserList={this.state.validUserList} />}
          {this.state.name && <EnterChat setMessage={this.setMessage} isTyping={this.isTyping} name={this.state.name} type={this.type} />}
          {this.state.name && <ShowChats messages={this.state.messageList} isTyping={this.state.isTyping} name={this.state.name} type={this.type} showPic={this.showPic} audio={this.audio} userList={this.state.validUserList} />}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
