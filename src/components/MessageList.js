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

    render() {
        const currentRoomKey = this.props.currentRoom.key;
        const filteredMessages = this.state.messages.filter(message => message.roomId == currentRoomKey);
        console.log(this.state.messages)
        console.log(filteredMessages)
        console.log(currentRoomKey)

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
            </section>
        );
    }
}

export default MessageList;