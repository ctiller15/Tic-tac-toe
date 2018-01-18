import React from 'react';

var human = 'X';
var ai = 'O';

class GameBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boardVals: ["","","","","","","","",""],
		}
	}

	handleClick(index) {
		console.log(`Clicked square ${index}!`);
		let newArr = this.state.boardVals;
		if(newArr[index] === "") {
			newArr[index] = 'X';
			console.log(newArr);
			this.setState({boardVals: newArr});			
		} else {
			console.log("That one has already been clicked!");
		}

	}

	squares() {
		var arr = new Array(9).fill("");
		return arr.map((date, i) => {
			return 	(
				<div key={i + 1} className={`square square${i + 1}`
				} onClick={() => { this.handleClick(i) }}>
					{this.state.boardVals[i]}
				</div>
			);
		});
	}

	render() {
		return(
			<div className="gameboard">
				{this.squares()}
			</div>
		);		
	}
}

export default GameBoard;