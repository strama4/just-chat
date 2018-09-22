import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            rooms: [],
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    createRoom = (event) => {
        event.preventDefault();
        const roomName = document.getElementById('room-name');
        this.roomsRef.push({
            name: roomName.value
        })
        roomName.value = "";

    }

    render() {
        return (
            <section className="nav-bar">
                <nav className="rooms-list">
                    {this.state.rooms.map((room) => {
                        return <div key={room.key} onClick={() => this.props.setCurrentRoom(room)}><button className="mdc-button">{room.name}</button></div>
                    })                 
                    }
                </nav>
                <form id="create-room" onSubmit={this.createRoom}>
                    <h1>Create Room</h1>
                    <label>
                        <p>Enter a room name:</p>
                        <input id="room-name" type="text" />
                        <input type="submit" value="Create" className="mdc-button"/>
                    </label>
                </form>    
            </section>
        );
    }
}

export default RoomList;