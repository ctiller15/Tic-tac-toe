import React from 'react';

var human = 'X';
var ai = 'O';
var firstMove = 0;
var lastMove = 0;
var moveCount = 0;

const winCombos = [
	[0,1,2],
	[0,3,6],
	[0,4,8],
	[1,4,7],
	[2,4,6],
	[2,5,8],
	[3,4,5],
	[6,7,8]
];

class GameBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boardVals: ["","","","","","","","",""],
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
		if(moveCount <= 4) {
			console.log(moveCount);
			console.log("we can move.");
			if(moveCount === 1) {
				if(firstMove !== 4) {
					board[4] = ai;
				} else {
					board[0] = ai;
				}
			} else if(moveCount === 3) {
				console.log(firstMove, lastMove);
				// First, block any potential wins.
				for(var i = 0; i < winCombos.length; i++) {
					console.log(winCombos[i].indexOf(firstMove), winCombos[i].indexOf(lastMove));
					if((winCombos[i].indexOf(firstMove) > -1) && (winCombos[i].indexOf(lastMove) > -1)) {
						// Oh no! We need to stop it from happening!
						let temp = winCombos[i];
						temp.splice(winCombos[i].indexOf(firstMove), 1);
						temp.splice(winCombos[i].indexOf(lastMove), 1);
						console.log(winCombos, winCombos[i].indexOf(firstMove), winCombos[i].indexOf(lastMove));
						if(board[temp[0]] !== ai) {
							console.log(`Player about to win with space ${firstMove} and ${lastMove}`);	
							console.log(`Counter by placing in space ${temp[0]}`);
							board[temp[0]] = ai;
						}
					}
				}

				// If that doesn't work, account for the edge cases.
				if(firstMove === 0) {
					lastMove === 5 ? board[7] = ai : lastMove === 7 ? board[5] = ai : board[1] = ai;
				} else if( firstMove === 1 ) {
					lastMove === 3 ? board[2] = ai : lastMove === 5 ? board[0] = ai : lastMove === 6 ? board[5] = ai : lastMove === 7 ? board[1] = ai : board[3] = ai;
				} else if(firstMove === 2) {
					lastMove === 3 ? board[7] = ai : lastMove === 6 ? board[1] = ai : board[3] = ai;
				} else if(firstMove === 3) {
					lastMove === 1 ? board[2] = ai : lastMove === 2 ? board[7] = ai : lastMove === 5 || lastMove === 8 ? board[1] = ai : board[0] = ai;
				} else if(firstMove === 4) {
					lastMove === 1 ? board[7] = ai : lastMove === 2 ? board[6] = ai : board[2] = ai;
				} else if(firstMove === 5) {
					lastMove === 0 ? board[7] = ai : lastMove === 1 || lastMove === 3 ? board[0] = ai : lastMove === 6 ? board[1] = ai : board[2] = ai;
				} else if(firstMove === 6) {
					lastMove === 1 ? board[5] = ai : board[1] = ai;
				} else if(firstMove === 7) {
					lastMove === 0 ? board[5] = ai : lastMove === 1 || lastMove === 3 ? board[0] = ai : lastMove === 2 ? board[3] = ai : board[2] = ai;
				} else if(firstMove === 8) {
					lastMove === 0 || lastMove === 3 ? board[1] = ai : board[3] = ai;
				}

			}
			this.setState(
				{
					boardVals: board,
					turn: ai === "X" ? "O" : "X"
				}
			);
			moveCount++;
		}
		else {
			console.log(`it is currently the AI's turn...`, this.state.turn);
			board[this.minimax(this.state.boardVals, this.state.turn).index] = ai;
			moveCount++;
			this.setState({turn: ai === "X" ? "O" : "X"}, this.checkTurn);			
		}
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
		moveCount === 0 ? firstMove = index : lastMove = index;
		if(turn === human){
			if(newArr[index] === "") {
				newArr[index] = turn;
				console.log(newArr, lastMove);
				console.log(`setting the state...`);
				moveCount++;
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