import React from 'react';
import uuid from 'node-uuid';

import * as DeckAPI from 'DeckAPI';

export class Room extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ready:false,
			decks: DeckAPI.getDecks(),
			start: 0,
			gridSize: 6,
			deck:undefined,
			enemy:undefined,
			// enemy: {
			// 	name: 'Toxcik',
			// 	ready: true,
			// }
		}
	}
	render() {
		var {name, creator, onClick} = this.props;
		var {ready, decks, start, gridSize, deck} = this.state;
		var renderGrid = () => {
			if(decks.length !== 0) {
				console.log(decks);
				var newdecks = [];
				var newStart = start % decks.length;
				var limit = decks.length < gridSize ? decks.length : (newStart + gridSize);
				for(var i = newStart; i < limit; i++) {
					if(i < 0) {
						newdecks.push(decks[i + decks.length]);
					} else if(i > (decks.length - 1)) {
						newdecks.push(decks[i - decks.length]);
					} else {
						newdecks.push(decks[i]);
					}
				}
				console.log(newdecks);

				return (<div className="cardGap cardGrid cardGrid2x3">
					{newdecks.map((deck) => {
						if(deck !== this.state.deck) {
							return (
								<div key={uuid()} className='justifySelfCenter alignSelfCenter'>
								<button 
								className='button large primary expanded hollow'
								onClick={(e) => {this.setState({deck});}}
								>
									Deck: {deck.name}
								</button></div>)
						} else {
							return (
								<div key={uuid()} className='justifySelfCenter alignSelfCenter'>
								<button 
								className='button large success expanded hollow'
								onClick={(e) => {this.setState({deck:undefined});}}
								>
									Deck: {deck.name}
								</button></div>)
						}
					})}
				</div>);

			} else {
				return (<div className="cardGap cardFlex centerFlex">
					<h1>
						<small>Waiting for enemy...</small>
					</h1>
				</div>)	
			}
		}
		var renderEnemy = () => {
			if(this.state.enemy) {
				return (
					<div className="cardGap cardFlex centerFlex">
						<h1 className='cardGap cardFlex centerFlex'>{this.state.enemy.name}</h1>
						<h1 className='cardGap cardFlex centerFlex'>
							{this.state.enemy.ready ? 'Ready' : 'Not ready'}
						</h1>
					</div>
				)
			} else {
				return (
					<div className="cardGap cardFlex centerFlex">
						<h1>
							<small>Empty</small>
						</h1>
					</div>
				)
			}
		}
		return (
			<div className="cardFlex fullWidth fullHeight">
				<div className="cardGap"></div>
				<div className="cardGap5 cardFlex columnOrder">
					<div className='cardGap cardFlex centerFlex'>
						<div className='cardGap cardFlex'>
							<button className='button large alert expanded' onClick={onClick}>
								Canel
							</button>
						</div>
						<div className='cardGap'></div>
						<h1 className='page-title'>Select Deck</h1>
						<div className='cardGap'></div>
						<div className='cardGap cardFlex'>
							<button className='button large success expanded' disabled={!deck}>
								{!ready ? 'Ready' : 'Not ready'}
							</button>
						</div>
					</div>
					<div className='cardGap5 callout secondary'>
						{renderGrid()}
					</div>
					<div className={this.state.enemy 
						? (this.state.enemy.ready 
							? 'cardGap success callout' 
							: 'cardGap alert callout') 
						: 'cardGap callout'}>
						{renderEnemy()}
					</div>
					<div className='cardGap'>
						<button className='button large success expanded' disabled={true}>
							Start game
						</button>
					</div>
				</div>
				<div className="cardGap"></div>
			</div>
		);
	}
}

export default Room;