import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle
} from '@rmwc/drawer';

import {
  List,
  ListItem,
  ListItemPrimaryText
} from '@rmwc/list';

import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCNJEER8dnWnKnUaZQcnGoaD_P5CfqSgM0",
  authDomain: "bloc-chat-c9eeb.firebaseapp.com",
  databaseURL: "https://bloc-chat-c9eeb.firebaseio.com",
  projectId: "bloc-chat-c9eeb",
  storageBucket: "bloc-chat-c9eeb.appspot.com",
  messagingSenderId: "621770486126"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawer>
          <RoomList firebase={firebase} />
        </Drawer>
      </div>
    );
  }
}

export default App;
