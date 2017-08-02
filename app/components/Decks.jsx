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
		var elements = [];
		for (var i = 0; i < 12; i++) {
			elements.push('Elem' + (i+1));
		}



		var renderGrid = () => {
			if(decks.length == 0) {
				var newElements = [];
				var newStart = start % elements.length;
				for(var i = newStart; i < newStart + gridSize; i++) {
					if(i < 0) {
						newElements.push(elements[i + elements.length]);
					} else if(i > (elements.length - 1)) {
						newElements.push(elements[i - elements.length]);
					} else {
						newElements.push(elements[i]);
					}
				}
				console.log(newElements);

				return (<div className="cardGap cardGrid cardGrid2x3">
					{newElements.map((elem) => {
						return (<div key={uuid()} className='justifySelfCenter alignSelfCenter'>{elem}</div>)
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