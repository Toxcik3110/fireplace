import React from 'react';

import Forces from 'Forces';

class Field extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="field">
				<Forces player={'enemy'} />
				<Forces player={'player'}/>
			</div>
		);
	}
}

export default Field;