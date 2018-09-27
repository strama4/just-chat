import React, {Component} from 'react';
import './reset.css';
import './styles.css';
import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';

import {
    List,
    ListItem,
    ListItemText,
    ListItemPrimaryText,
    ListItemSecondaryText
} from '@rmwc/list';

import '@material/list/dist/mdc.list.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        }
        
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat((message)) })
        })
    }

    composeMessage = (event) => {
        event.preventDefault();
        const newMessage = document.getElementById('message-content');
        this.messagesRef.push({
            content: newMessage.value,
            username: this.props.currentUser.displayName,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.currentRoom.key
        })
        newMessage.value = "";
    }

    getTimeStamp = (time) => {
        const moment = require('moment');
        moment().format();
        const timeSent = moment(time);
        return moment(timeSent).fromNow();
    }

    render() {
        const currentRoomKey = this.props.currentRoom.key;
        const filteredMessages = this.state.messages.filter(message => message.roomId === currentRoomKey);

        return (
            <div class="chat-area">
                <ul className="mdc-list mdc-list--two-line">
                    <h2>{this.props.currentRoom.name}</h2>
                    {filteredMessages.map((message) => {
                        return (
                            <li className="message-item" key={this.state.messages.indexOf(message)}> 
                                <span className="mdc-list-item__text">
                                    <span className="author-time"><span className="username">{message.username}:</span><span className="time-sent">{this.getTimeStamp(message.sentAt)}</span></span>
                                    <span className="mdc-list-item__secondary-text">{message.content}</span>
                                </span>
                            </li>
                            
                        );
                    })}         
                </ul>
                <form id="message-input-form" onSubmit={(e) => this.composeMessage(e)} className="margin">
                    <TextField fullwidth id="message-content" placeholder="Type your message..."/>
                    <input className="mdc-button" type="submit" value="Send" />
                </form>     
            </div>
            
        );
    }
}

export default MessageList;