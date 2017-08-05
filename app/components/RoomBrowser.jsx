import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import uuid from 'node-uuid';

import {socket} from 'MainApp';
import * as actions from 'actions';
import Room from 'Room';
import Modal from 'Modal';

export class RoomBrowser extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			room: undefined,
			playerName:undefined,
			roomName:undefined,
			// room: {
			// 	name: 'My game',
			// 	creator: 'Toxcik',
			// }
		}
		socket.emit('getRooms');
		socket.on('rooms', (data) => {
			this.updateRooms(data);
		});
		socket.on('joinRoom', (data) => {
			if(data.result === true) {
				console.log('join room',data);
				this.setState({
					room:data.room,
				});
			}

		});
		socket.on('closeRoom', (data) => {
			console.log('closeRoom');
			this.setState({
				room:undefined,
			});
			socket.emit('getRooms');
		});
		socket.on('leaveRoom', (data) => {
			if(data) {
				this.setState({
					room:undefined,
				});
			}
		});
		socket.on('createRoom', (data) => {
			if(data.result === true) {
				console.log('created room', data);
				this.setState({
					room:{
						name:data.room.name,
						creator:data.room.playerName,
					},
					playerName:data.room.playerName,
				});
			} else if (data.result === false) {
				this.setState({
					room:undefined,
				});
			}
		});
		// this.props.dispatch(actions.modalHide())
		this.updateRooms = this.updateRooms.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeNameRoom = this.changeNameRoom.bind(this);
	}

	changeName(name) {
		this.setState({
			playerName:name,
		})
	}

	changeNameRoom(name, room) {
		this.setState({
			playerName:name,
			roomName:room,
		})
	}

	updateRooms(data) {
		if(data) {
			this.setState({
				rooms:[...data.rooms],
			})
		} else {
			socket.emit('getRooms');
		}
	}

	render() {
		var {rooms, room} = this.state;
		var {dispatch} = this.props;
		var renderRooms = () => {
			return rooms.map((room) => {
				return (<div key={uuid()} className='cardFlex callout secondary justifyAround alignCenter'>
							<h1 className='cardGap3'>{room.name}</h1>
							<h1 className='cardGap3'><small>{room.creator}</small></h1>
							<button 
							className='cardGap button primary expanded'
							onClick={(e) => {
								var data = {
									header: ()=>{
										return (<div><h1 className='page-title'>Join to the game</h1></div>);
									},
									body: ()=>{
										return (
										<div>
											<div>
												<input 
												type='text' 
												placeholder='Enter your name'
												onChange={(e) => {
													this.setState({
														playerName:e.target.value,
													});
												}}
												value={this.state.playerName}
												/>
											</div>
											<div>
												<button 
												className='button large alert hollow expanded'
												onClick={(e) => {
													dispatch(actions.modalHide());
													this.changeName();
												}}
												>
													{'Cancel'}
												</button>
												<button 
												className='button large success hollow expanded'
												onClick={(e) => {
													dispatch(actions.modalHide());
													socket.emit('joinRoom', {
														room: {
															name:room.name,
															creator:room.creator,
														},
														playerName:this.state.playerName,
													});
												}}
												>
													{'Join game'}
												</button>
											</div>
										</div>);
									},
								}
								dispatch(actions.modalShow(data));
							}}
							>
								Join
							</button>
						</div>);
			})
		}
		if(room !== undefined) {
			return (<Room 
						name={room.name} 
						creator={room.creator} 
						playerName={this.state.playerName}
						onClick={(e) => {
							this.setState({
								room:undefined,
							});
						}}
					/>);
		} else {
			return (
				<div className="cardFlex fullWidth fullHeight columnOrder">
					<div className='cardGap cardFlex centerFlex'>
						<div className='cardGap'></div>
						<div className='cardGap cardFlex'>
							<NavLink to="/" className='cardGap'>
								<button className='button large alert expanded'>
									Back
								</button>
							</NavLink>
						</div>
						<div className='cardGap'></div>
						<h1 className='page-title'>Room Browser</h1>
						<div className='cardGap'></div>
						<div className='cardGap'></div>
						<div className='cardGap'></div>
					</div>
					<div className='cardGap5 callout'>
						{renderRooms()}
					</div>
					<div className='cardGap cardFlex centerFlex'>
						<div className='cardGap'></div>
						<div className='cardGap'>
							<button className='button large primary expanded'>
								{'<='}
							</button>
						</div>
						<div className='cardGap'></div>
						<div className='cardGap5'>
							<button 
							className='button large success hollow expanded'
							onClick={(e) => {
								var data = {
									header: ()=>{
										return (<div><h1 className='page-title'>Create game</h1></div>);
									},
									body: ()=>{
										return (
										<div>
											<div>
												<input 
												type='text' 
												placeholder='Enter your name'
												onChange={(e) => {
													this.setState({
														playerName:e.target.value,
													});
												}}
												value={this.state.playerName}
												/>
												<input 
												type='text' 
												placeholder='Enter room name'
												onChange={(e) => {
													this.setState({
														roomName:e.target.value,
													});
												}}
												value={this.state.roomName}
												/>
											</div>
											<div>
												<button 
												className='button large alert hollow expanded'
												onClick={(e) => {
													dispatch(actions.modalHide());
													this.changeNameRoom();
												}}
												>
													{'Cancel'}
												</button>
												<button 
												className='button large success hollow expanded'
												onClick={(e) => {
													dispatch(actions.modalHide());
													socket.emit('createRoom', {room: {
														name:this.state.roomName,
														creator:this.state.playerName,
														playerName:this.state.playerName,
													}})
												}}
												>
													{'Create game'}
												</button>
											</div>
										</div>);
									},
								}
								dispatch(actions.modalShow(data));
							}}
							>
								{'Create game'}
							</button>
						</div>
						<div className='cardGap'></div>
						<div className='cardGap3'>
							<button 
							className='button large primary expanded'
							onClick={(e) => {
								socket.emit('getRooms')
							}}
							>
								{'Refresh'}
							</button>
						</div>
						<div className='cardGap'></div>
						<div className='cardGap'>
							<button className='button large primary expanded'>
								{'=>'}
							</button>
						</div>
						<div className='cardGap'></div>
					</div>
					<Modal />
				</div>
			);
		}
	}
}

export default connect(
	(state) => {
		return {
			modal:state.modal,
		}
	}
)(RoomBrowser) ;