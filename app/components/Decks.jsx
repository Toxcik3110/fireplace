import React from 'react';
import {connect} from 'react-redux';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div class="cardFlex fullWidth fullHeight">
				<div class="cardGap"></div>
				<div class="cardGap cardFlex columnOrder">
					<div class="cardGap"></div>
					<div class="cardGap5 cardFlex">
						<div class="cardFlex centerFlex">
							<h1 class="page-title">Your decks</h1>
						</div>
						<div class="">
							
						</div>
					</div>
					<div class="cardGap"></div>
				</div>
				<div class="cardGap"></div>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			decks:state.decks,
		}
	}
)(Decks);