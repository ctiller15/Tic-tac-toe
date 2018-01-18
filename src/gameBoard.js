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

	// Checks all of the current empty spaces on the board.
	// returns their indices as an array.
	getEmptySpaces() {
		let temp = this.state.boardVals;
		let spaces = [];
		for(var i = 0; i < temp.length; i++) {
			if(temp[i] === "") {
				spaces.push(i);
			}
		}
		return spaces;
	}

	// Checks all 8 possible win conditions to see if a player has won.
	getWinner(board, player) {
	  	if(
		    ((board[0] === player) && (board[1] === player) && (board[2] === player)) ||
		    ((board[0] === player) && (board[3] === player) && (board[6] === player)) ||
		    ((board[0] === player) && (board[4] === player) && (board[8] === player)) ||
		    ((board[1] === player) && (board[4] === player) && (board[7] === player)) ||
		    ((board[2] === player) && (board[4] === player) && (board[6] === player)) ||
		    ((board[2] === player) && (board[5] === player) && (board[8] === player)) ||
		    ((board[3] === player) && (board[4] === player) && (board[5] === player)) ||
		    ((board[6] === player) && (board[7] === player) && (board[8] === player))
	    ) {
	      return true;
	    } else {
	      return false;
	    }
	}		

	handleClick(index) {
		console.log(`Clicked square ${index}!`);
		let newArr = this.state.boardVals;
		if(newArr[index] === "") {
			newArr[index] = 'X';
			console.log(newArr);
			console.log(this.getEmptySpaces());
			console.log(this.getWinner(this.state.boardVals, 'X'));
			this.setState({boardVals: newArr});			
		} else {
			console.log("That one has already been clicked!");
		}

	}

	squares() {
		return this.state.boardVals.map((square, i) => {
			return 	(
				<div key={i + 1} className={`square square${i + 1}`
				} onClick={() => { this.handleClick(i) }}>
					{square}
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