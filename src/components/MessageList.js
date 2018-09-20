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
            message.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
            this.setState({ messages: this.state.messages.concat((message)) })
        })
    }

    render() {
        return (
            <section id="messages-list">
                <div className="messages-list">
                    <h3>{this.props.currentRoom.name}</h3>
                    {console.log(this.props.currentRoom.name)}
                    {this.state.messages.filter(message => message.roomId === this.props.currentRoom.key).map(message =>
                        <p>{message.content}</p>)}
                </div>
            </section>
        );
    }
}

export default MessageList;