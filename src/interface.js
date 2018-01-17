import React from 'react';

import GameBoard from './gameBoard';

class Interface extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div>
				<GameBoard/>
			</div>
		);
	}
}

export default Interface;