import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

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

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';

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
          currentRoom: '',
          user: {username: 'Guest',
                displayName: 'Guest'
            }
        };
    }

    setCurrentRoom = (room) => {
        this.setState({ currentRoom: room });
    }

    setUser = (user) => {
        this.setState({ user: user});
    }

    render() {
        return (
            <div className="App mdc-layout-grid">
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell--span-4">
                        <Drawer>
                            <User 
                                firebase={firebase} 
                                handleUserButtonClick={this.handleUserButtonClick} 
                                setUser={this.setUser}
                                user={this.state.user}/>
                            <RoomList firebase={firebase} setCurrentRoom={this.setCurrentRoom}/>
                        </Drawer>
                    </div>
                    <div className="mdc-layout-grid__cell--span-6">
                        <MessageList 
                            firebase={firebase} 
                            currentRoom={this.state.currentRoom}
                            currentUser={this.state.user}     />
                    </div>
                    <div className="mdc-layout-grid__cell-span-2"></div>
                </div>
            </div>
        );
    }
}

export default App;
