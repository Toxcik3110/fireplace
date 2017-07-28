import React from 'react';
import ReactDOM from 'react-dom';

//Load foundation
$(document).foundation();


//APP CSS
import 'style-loader!css-loader!sass-loader!applicationStyles';

ReactDOM.render(
		<div><h1>{'Fireplace'.toUpperCase()}</h1></div>,
	document.getElementById("app")
);