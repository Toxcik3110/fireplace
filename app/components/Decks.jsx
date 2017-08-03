import React from 'react';
// import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import uuid from 'node-uuid';

import * as DeckAPI from 'DeckAPI';
import DeckBuilder from 'DeckBuilder';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			decks: DeckAPI.getDecks(),
			start: 0,
			gridSize: 6,
			showDeckBuilder:false,
			deck:null,
		}
		this.increaseStart = this.increaseStart.bind(this);
		this.decreaseStart = this.decreaseStart.bind(this);
		this.enableDeckBuilder = this.enableDeckBuilder.bind(this);
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

	enableDeckBuilder = (deck, update) => {
		var decks = this.state.decks;
		if(update) {
			decks = DeckAPI.getDecks();
		}
		this.setState({
			showDeckBuilder:!this.state.showDeckBuilder,
			decks,
			deck,
		})
	}

	render() {
		var {decks, start, gridSize, showDeckBuilder} = this.state;

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
						return (
							<div key={uuid()} className='justifySelfCenter alignSelfCenter'>
								<button 
								className='button large primary expanded hollow'
								onClick={(e) => {
									this.enableDeckBuilder(deck);
								}}
								>
									Deck: {deck.name}
								</button>
								<button 
								className='button large alert expanded hollow'
								onClick={(e) => {
									this.setState({
										decks:DeckAPI.removeDeck(deck),
									});
								}}
								>
									Remove deck
								</button>
							</div>)
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
		var renderDeck = () => {
			return (
				<div className="cardFlex fullWidth fullHeight">
					<div className="cardGap"></div>
					<div className="cardGap5 columnOrder cardFlex">
						<div className="cardGap cardFlex">
							<div className="cardGap cardFlex centerFlex">
								<NavLink to="/">
									<button className='button large alert expanded'>
										Back
									</button>
								</NavLink>
							</div>
							<div className="cardGap"></div>
							<div className="cardGap5">
								<h1 className="page-title">Your Decks</h1>
							</div>
							<div className="cardGap"></div>
						</div>
						<div className="cardGap3 cardFlex">
							<div className="cardGap5 callout cardFlex">
								{renderGrid()}
							</div>
						</div>
						<div className="cardGap cardFlex alignCenter">
							<div className="cardGap">
								<button 
								className='button large primary expanded'
								onClick={this.decreaseStart}
								disabled={this.state.decks.length < this.state.gridSize}
								>
									{'<='}
								</button>
							</div>
							<div className="cardGap"></div>
							<div className="cardGap3">
								<button 
								className='button large primary hollow expanded'
								onClick={this.enableDeckBuilder}
								>
									Create new Deck
								</button>
							</div>
							<div className="cardGap"></div>
							<div className="cardGap">
								<button 
								className='button large primary expanded'
								onClick={this.increaseStart}
								disabled={this.state.decks.length < this.state.gridSize}
								>
									{'=>'}
								</button>
							</div>
						</div>
					</div>
					<div className="cardGap"></div>
				</div>
			);
		}
		var whatToRender = () => {
			if(!showDeckBuilder) {
				return renderDeck();
			} else {
				return (<DeckBuilder playerDeck={this.state.deck} showDeckBuilder={this.enableDeckBuilder} />)
			}
		}
		return whatToRender();
	}
}

// export default connect(
// 	(state) => {
// 		return {
// 			decks:state.decks,
// 		}
// 	}
// )(Decks);

export default Decks;