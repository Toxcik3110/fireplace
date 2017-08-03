import React from 'react';

export class Room extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ready:false,
		}
	}
	render() {
		var {name, creator, onClick} = this.props;
		var {ready} = this.state;
		return (
			<div className="cardFlex fullWidth fullHeight columnOrder">
				<div className='cardGap cardFlex centerFlex'>
					<div className='cardGap'></div>
					<div className='cardGap cardFlex'>
						<button className='button large alert expanded' onClick={onClick}>
							Canel
						</button>
					</div>
					<div className='cardGap'></div>
					<h1 className='page-title'>Select Deck</h1>
					<div className='cardGap'></div>
					<div className='cardGap cardFlex'>
						<button className='button large success expanded'>
							{!ready ? 'Ready' : 'Not ready'}
						</button>
					</div>
					<div className='cardGap'></div>
				</div>
				<div className='cardGap5 callout secondary'>
					Decks
				</div>
				<div className='cardGap'>Enemy</div>
				<div className='cardGap'>
					<button className='button large success expanded' disabled={true}>
						Start game
					</button>
				</div>
			</div>
		);
	}
}

export default Room;