import React from 'react';

import Forces from 'Forces';

class Field extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="field">
				<Forces cards={[{classes:'card1'}]} player={'player2'} />
				<Forces cards={[{},{}]} player={'player1'}/>
			</div>
		);
	}
}

export default Field;