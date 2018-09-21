import React, {Component} from 'react';

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

    render() {
        const currentRoomKey = this.props.currentRoom.key;
        const filteredMessages = this.state.messages.filter(message => message.roomId == currentRoomKey);

        return (
            <section id="messages-list">
                    <h2>{this.props.currentRoom.name}</h2>
                    {filteredMessages.map((message) => {
                        return (
                                <div key={this.state.messages.indexOf(message)}>
                                    <h3>{message.username}:</h3>
                                    <span>{message.content}</span>
                                </div>
                            
                        );
                    })}
                    <form id="message-input-form" onSubmit={(e) => this.composeMessage(e)}>
                        <input id="message-content" type="text" placeholder="Type your message..." />
                        <input type="submit" value="Send" />
                    </form>                
            </section>
        );
    }
}

export default MessageList;