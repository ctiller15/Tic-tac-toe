import React from 'react';

var human = 'X';
var ai = 'O';

class GameBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boardVals: ["X","O","","","","","","",""],
			turn: human,
			gameOver: false
		}
	}

// This works, HOWEVER, right now it is an insane drain on execution time! You need to find a way to minimize the load here!
	minimax(board, player) {


		// An array of all potential moves.
		var moves = [];

		var emptySpaces = this.getEmptySpaces();
		console.log(emptySpaces);

		// The base condition for the minimax function.

		if(this.getWinner(board, human)) {
			console.log('human win!');
			return {score: -10};
		} else if(this.getWinner(board, ai)) {
			console.log('ai win!');
			return {score: 10};
		} else if(emptySpaces.length === 0) {
			console.log('game ends!');
			return {score: 0};
		}

		// Loop through the empty spaces.
		for(var i = 0; i < emptySpaces.length; i++) {

			var result;

			// Create an object for each index.
			var move = {};
			move.index = emptySpaces[i];
			console.log(move);

			// Creating a "move" for the current player.
			board[emptySpaces[i]] = player;
			console.log(board);

			// Call minimax, return the value, and then reset to empty.
			// Store the result into the move object.

			if(player === ai) {
				result = this.minimax(board, human);
				console.log(result, this.minimax(board, human));
				move.score = result.score;
			} else {
				result = this.minimax(board, ai);
				console.log(result);
				move.score = result.score;
			}
			console.log(emptySpaces[i], result);

			board[emptySpaces[i]] = "";

			moves.push(move);
			console.log(moves);
		}


		  // If it's the computer's turn, loop over the moves and choose the move with the highest score.
		  var bestMove, bestScore;
		  if(player === ai) {
		    bestScore = -10000;
		    // eslint-disable-next-line
		    for(var i = 0; i < moves.length; i++) {
		      if(moves[i].score > bestScore) {
		        bestScore = moves[i].score;
		        bestMove = i;
		      }
		    }
		  } else {
		    bestScore = 10000;
		    // eslint-disable-next-line
		    for(var i = 0; i < moves.length; i++) {
		      if(moves[i].score < bestScore) {
		        bestScore = moves[i].score;
		        bestMove = i;
		      }
		    }
		  }
		  
		  // return the chosen move (object) from the moves array.
		  return moves[bestMove];
	}

	checkTurn() {
		console.log(this.state);
		if(this.state.turn === human) {
			this.playerMove();
		} else if(this.state.turn === ai) {
			this.aiMove();
		}
	}

	aiMove() {
		let board = this.state.boardVals;
		console.log(`it is currently the AI's turn...`, this.state.turn);
		board[this.minimax(this.state.boardVals, this.state.turn).index] = ai;
		// console.log(board, this.minimax(this.state.boardVals, this.state.turn));
		this.setState({turn: ai === "X" ? "O" : "X"}, this.checkTurn);
	}

	playerMove() {
		console.log(`it is currently the human's turn...`);
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

	handleClick(index, turn) {
		console.log(`Clicked square ${index}!`);
		let newArr = this.state.boardVals;
		if(turn === human){
			if(newArr[index] === "") {
				newArr[index] = turn;
				console.log(newArr);
				console.log(`setting the state...`);
				this.setState(
					{
						boardVals: newArr,
						turn: turn === "X" ? "O" : "X",
						gameOver: this.getWinner(this.state.boardVals, turn)
					}, () => {setTimeout(this.checkTurn.bind(this), 1500)});			
			} else {
				console.log("That one has already been clicked!");
			}			
		}
	}

	squares() {
		return this.state.boardVals.map((square, i) => {
			if(this.state.gameOver) {
				return 	(
					<div key={i + 1} className={`square square${i + 1}`}>
						{square}
					</div>
				);				
			} else {
				return 	(
					<div key={i + 1} className={`square square${i + 1}`
					} onClick={() => { this.handleClick(i, this.state.turn) }}>
						{square}
					</div>
				);
			}
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