import React from 'react';
import {NavLink} from 'react-router-dom';
import {collection} from 'reducers';
import uuid from 'node-uuid';

import Card from 'Card';
import * as DeckAPI from 'DeckAPI';

export class DeckBuilder extends React.Component {

	constructor(props) {
		super(props);
		var name = '';
		var deck = [];
		if(this.props.playerDeck !== null) {
			if(this.props.playerDeck.name) name = this.props.playerDeck.name;
			if(this.props.playerDeck.deck) deck = [...this.props.playerDeck.deck];
		}
		this.state = {
			deck: deck,
			start: 0,
			gridSize: 4,
			sStart: 0,
			name: name,
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
		var renderFlex = () => {
			var that = this;
			if(deck.length !== 0) {
				var newdeck = [];
				var newStart = start % deck.length;
				var limit = deck.length < gridSize ? deck.length : (newStart + gridSize);
				for(var i = newStart; i < limit; i++) {
					if(i < 0) {
						newdeck = [...newdeck, deck[i + deck.length]]
					} else if(i > (deck.length - 1)) {
						newdeck = [...newdeck, deck[i - deck.length]];
					} else {
						newdeck = [...newdeck, deck[i]];
					}
				}

				return (newdeck.map((card) => {
						if(card)
						return (<Card 
							key={uuid()} 
							{...card}
							classes={card.classes ? card.classes : ''}
							whereIs={'DeckBuilder'}
							onClick={(e) => {
								e.preventDefault();
								that.setState({
									deck:that.state.deck.filter((c) => {
										return (c !== card);
									}),
								});
							}}
							onMouseEnter={(e) => {
							}}
							onMouseLeave={(e) => {
							}}
							onMouseMove={(e) => {
							}}/>)
					}));
			} else {
				return (<div className="cardGap cardFlex centerFlex">
					<h1>
						<small>Empty</small>
					</h1>
				</div>)	
			}
		}
		var renderCollection = () => {
			var {showDeckBuilder, deck} = this.props;
			var that = this;
			var newcollection = [];
			var newStart = sStart % collection.length;
			var limit = collection.length < gridSize ? collection.length : (newStart + gridSize);
			for(var i = newStart; i < limit; i++) {
			// for(var i = newStart; i < newStart + gridSize; i++) {
				if(i < 0) {
					newcollection = [...newcollection, collection[i + collection.length]]
				} else if(i > (collection.length - 1)) {
					newcollection = [...newcollection, collection[i - collection.length]];
				} else {
					newcollection = [...newcollection, collection[i]];
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
								e.preventDefault();
								console.log('Click')
								that.setState({
									deck:[...that.state.deck, card],
								});
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
					<div className="cardGap"></div>
					<div className="cardGap">
						<button 
						className='button large alert expanded'
						onClick={(e) => {
							e.preventDefault();
							this.props.showDeckBuilder();
						}}
						>
							Exit
						</button>
					</div>
					<div className="cardGap"></div>
					<div className="cardGap5">
						<input 
						type="text" 
						className='bigInput centerText' 
						placeholder="Deck name..."
						value={this.state.name}
						onChange={(e) => {
							this.setState({
								name:e.target.value,
							})
						}} />
					</div>
					<div className="cardGap"></div>
					<div className="cardGap">
						<button 
						className='button large success expanded'
						onClick={(e) => {
							e.preventDefault();
							DeckAPI.addDeck({
								name:this.state.name,
								deck:this.state.deck,
							});
							this.props.showDeckBuilder(null, true);
						}}
						>
							Create Deck
						</button>
					</div>
					<div className="cardGap"></div>
				</div>
				<div className="cardGap4 cardFlex columnOrder">
					<h2 className='centerText'>Your Collection</h2>
					<div className="cardGap3 cardFlex centerFlex">
						<div className="cardGap"></div>
						<div className="cardGap">
							<button 
							className='button large primary expanded'
							onClick={this.decreaseStart}
							disabled={deck.length < this.state.gridSize}
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
							disabled={deck.length < this.state.gridSize}
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