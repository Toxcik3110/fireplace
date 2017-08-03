import React from 'react';
import {socket} from 'MainApp';
import {NavLink} from 'react-router-dom';
import uuid from 'node-uuid';

import Room from 'Room';

export class RoomBrowser extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			room: undefined,
			// room: {
			// 	name: 'My game',
			// 	creator: 'Toxcik',
			// }
		}
		socket.emit('getRooms');
		socket.on('rooms', (data) => {
			this.updateRooms(data);
		});
		this.updateRooms = this.updateRooms.bind(this);
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
		var renderRooms = () => {
			return rooms.map((room) => {
				return (<div key={uuid()} className='cardFlex callout secondary justifyAround alignCenter'>
							<h1 className='cardGap3'>{room.name}</h1>
							<h1 className='cardGap3'><small>{room.creator}</small></h1>
							<button 
							className='cardGap button primary expanded'
							onClick={(e) => {
								this.setState({
									room,
								});
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
							<button className='button large success hollow expanded'>
								{'Create game'}
							</button>
						</div>
						<div className='cardGap'></div>
						<div className='cardGap3'>
							<button className='button large primary expanded'>
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
				</div>
			);
		}
		// return (
		// 	<div className="cardFlex fullWidth fullHeight columnOrder">
		// 		<div className='cardGap cardFlex'>
		// 			<div className='cardGap'></div>
		// 			<div className='cardGap cardFlex centerFlex'>
		// 				<NavLink to="/">
		// 					<button className='button large alert expanded'>
		// 						Back
		// 					</button>
		// 				</NavLink>
		// 			</div>
		// 			<div className='cardGap'></div>
		// 			<h1 className='page-title'>Room Browser</h1>
		// 			<div className='cardGap'></div>
		// 			<div className='cardGap'></div>
		// 			<div className='cardGap'></div>
		// 		</div>
		// 		<div className='cardGap5 callout secondary'>
		// 			{renderRooms()}
		// 		</div>
		// 		<div className='cardGap cardFlex centerFlex'>
		// 			<div className='cardGap'></div>
		// 			<div className='cardGap'>
		// 				<button className='button large primary expanded'>
		// 					{'<='}
		// 				</button>
		// 			</div>
		// 			<div className='cardGap'></div>
		// 			<div className='cardGap5'>
		// 				<button className='button large success hollow expanded'>
		// 					{'Create game'}
		// 				</button>
		// 			</div>
		// 			<div className='cardGap'></div>
		// 			<div className='cardGap3'>
		// 				<button className='button large primary expanded'>
		// 					{'Refresh'}
		// 				</button>
		// 			</div>
		// 			<div className='cardGap'></div>
		// 			<div className='cardGap'>
		// 				<button className='button large primary expanded'>
		// 					{'=>'}
		// 				</button>
		// 			</div>
		// 			<div className='cardGap'></div>
		// 		</div>
		// 	</div>
		// );
	}
}

export default RoomBrowser;