import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            rooms: []
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

    createRoom(name) {

    }

    render() {
        return (
            <section>
                <nav className="rooms-list">
                    {this.state.rooms.map((room) => {
                        return <p key={room.key}>{room.name}</p>
                    })                 
                    }
                </nav>
                <form>
                    This will be a new form
                </form>
            </section>
        );
    }
}

export default RoomList;