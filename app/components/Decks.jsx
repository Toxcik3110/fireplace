import React from 'react';
// import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import uuid from 'node-uuid';

import * as DeckAPI from 'DeckAPI';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			decks: DeckAPI.getDecks(),
			start: 0,
			gridSize: 6,
		}
		this.increaseStart = this.increaseStart.bind(this);
		this.decreaseStart = this.decreaseStart.bind(this);
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

	render() {
		var {decks, start, gridSize} = this.state;

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
								<button className='button large success expanded hollow'>{deck.name}</button>
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
		return (
			<div className="cardFlex fullWidth fullHeight">
				<div className="cardGap"></div>
				<div className="cardGap5 columnOrder cardFlex">
					<div className="cardGap">
						<h1 className="page-title">Your Decks</h1>
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
							<NavLink to="/DeckBuilder">
								<button className='button large success hollow expanded'>
									Create new Deck
								</button>
							</NavLink>
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
}

// export default connect(
// 	(state) => {
// 		return {
// 			decks:state.decks,
// 		}
// 	}
// )(Decks);

export default Decks;