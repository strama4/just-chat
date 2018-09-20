import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import Landing from './components/Landing.js';

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
    constructor(props) {
        super(props);

        this.state = {
          currentRoom: ''
        }
    }

    setCurrentRoom = (room) => {
      this.setState({ currentRoom: room });
    }

    render() {
        return (
            <div className="App">
                <Drawer>
                    <RoomList firebase={firebase} setCurrentRoom={this.setCurrentRoom}/>
                </Drawer>
                <MessageList firebase={firebase} currentRoom={this.state.currentRoom} />
            </div>
        );
    }
}

export default App;
