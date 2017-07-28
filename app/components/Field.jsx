import React from 'react';

import Forces from 'Forces';

class Field extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="field">
				<Forces cards={[{classes:'card1'}]} player={'blue'} />
				<Forces cards={[{},{},{},{}]} player={'red'}/>
			</div>
		);
	}
}

export default Field;