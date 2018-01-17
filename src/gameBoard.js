import React from 'react';

function squares() {
	var arr = new Array(9).fill("");
	return arr.map((date, i) => {
		return 	(
			<div key={i + 1} className={`square square${i + 1}`}></div>
		);
	});
}

function GameBoard() {
	return(
		<div className="gameboard">
			{squares()}
		</div>
	);

}

export default GameBoard;