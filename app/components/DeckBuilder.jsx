import React from 'react';
import {NavLink} from 'react-router-dom';
import {collection} from 'reducers';
import uuid from 'node-uuid';

import Card from 'Card';

export class DeckBuilder extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			deck: [],
			start: 0,
			gridSize: 6,
			sStart: 0,
		}
		this.increaseStart = this.increaseStart.bind(this);
		this.decreaseStart = this.decreaseStart.bind(this);
		this.increaseSStart = this.increaseSStart.bind(this);
		this.decreaseSStart = this.decreaseSStart.bind(this);
	}

	increaseStart = (e) => {
		e.preventDefault();
		this.setState({
			start:this.state.start+1,
		})
	}

	decreaseStart = (e) => {
		e.preventDefault();
		this.setState({
			start:this.state.start-1,
		})
	}

	increaseSStart = (e) => {
		e.preventDefault();
		this.setState({
			sStart:this.state.sStart+1,
		})
	}

	decreaseSStart = (e) => {
		e.preventDefault();
		this.setState({
			sStart:this.state.sStart-1,
		})
	}

	render() {
		var {deck, start, sStart, gridSize} = this.state;
		console.log(collection)
		var renderFlex = () => {
			if(deck.length !== 0) {
				var newdeck = [];
				var newStart = start % deck.length;
				for(var i = newStart; i < newStart + gridSize; i++) {
					if(i < 0) {
						newdeck.push(deck[i + deck.length]);
					} else if(i > (deck.length - 1)) {
						newdeck.push(deck[i - deck.length]);
					} else {
						newdeck.push(deck[i]);
					}
				}
				// console.log(newdeck);

				return (<div className="cardGap cardFlex justifyAround">
					{newdeck.map((elem) => {
						return (<div key={uuid()}>{elem}</div>)
					})}
				</div>);

			} else {
				return (<div className="cardGap cardFlex centerFlex">
					<h1>
						<small>Empty</small>
					</h1>
				</div>)	
			}
		}
		var renderCollection = () => {
			var newcollection = [];
			var newStart = sStart % collection.length;
			for(var i = newStart; i < newStart + gridSize; i++) {
				if(i < 0) {
					newcollection.push(collection[i + collection.length]);
				} else if(i > (collection.length - 1)) {
					newcollection.push(collection[i - collection.length]);
				} else {
					newcollection.push(collection[i]);
				}
			}
			return (
					newcollection.map((card) => {
						return (
							<Card 
							key={uuid()} 
							{...card}
							classes={card.classes ? card.classes : ''}
							whereIs={'DeckBuilder'}
							onClick={(e) => {
							}}
							onMouseEnter={(e) => {
							}}
							onMouseLeave={(e) => {
							}}
							onMouseMove={(e) => {
							}}/>
						);
					})
			);

		}
		return (
			<div className="cardFlex fullWidth fullHeight columnOrder">
				<div className="cardGap cardFlex alignCenter">
					<div className="cardGap">
						<NavLink to="/decks">
							<button className='button large alert expanded'>
								Exit
							</button>
						</NavLink>
					</div>
					<div className="cardGap"></div>
					<div className="cardGap3">
							<input type="text" className='bigInput centerText' placeholder="Deck name..." />
					</div>
					<div className="cardGap"></div>
					<div className="cardGap">
						<NavLink to="/decks">
							<button className='button large success expanded'>
								Create new Deck
							</button>
						</NavLink>
					</div>
				</div>
				<div className="cardGap4 cardFlex columnOrder">
					<h2 className='centerText'>Your Collection</h2>
					<div className="cardGap3 cardFlex centerFlex">
						<div className="cardGap"></div>
						<div className="cardGap">
							<button 
							className='button large primary expanded'
							onClick={this.decreaseStart}
							disabled={this.state.deck.length < this.state.gridSize}
							>
								{'<='}
							</button>
						</div>
						<div className="cardGap"></div>
						<div className="cardGap5 height100 callout secondary cardFlex cardCollection">
							{renderFlex()}
						</div>
						<div className="cardGap"></div>
						<div className="cardGap">
							<button 
							className='button large primary expanded'
							onClick={this.increaseStart}
							disabled={this.state.deck.length < this.state.gridSize}
							>
								{'=>'}
							</button>
						</div>
						<div className="cardGap"></div>
					</div>
				</div>
				<div className="cardGap4 cardFlex columnOrder">
					<h2 className='centerText'>All Cards</h2>
					<div className="cardGap3 cardFlex centerFlex">
						<div className="cardGap"></div>
						<div className="cardGap">
							<button 
							className='button large primary expanded'
							onClick={this.decreaseSStart}
							disabled={collection.length < this.state.gridSize}
							>
								{'<='}
							</button>
						</div>
						<div className="cardGap"></div>
						<div className="cardGap5 height100 callout secondary cardFlex cardCollection">
							{renderCollection()}
						</div>
						<div className="cardGap"></div>
						<div className="cardGap">
							<button 
							className='button large primary expanded'
							onClick={this.increaseSStart}
							disabled={collection.length < this.state.gridSize}
							>
								{'=>'}
							</button>
						</div>
						<div className="cardGap"></div>
					</div>
				</div>
				<div className="cardGap cardFlex columnOrder">
					<p className='centerText'>Select Card from "All Cards" to add Card to "Your Collection"</p>
					<p className='centerText'>Select Card from "Your Collection" to remove Card</p>
				</div>
			</div>
		);
	}
}

export default DeckBuilder;