import React , {useState} from "react";
import Board from "../Board/Board";
import { calculateWinner } from "../../helpers";
import "./Game.css"

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);

    const handleClick = i => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current];
        //if user clicks an occupied space or if the game is won, return
        if(winner || squares[i]) return;
        //put an X or an O in the clicked square
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setStepNumber(timeInHistory.length);
        setXisNext(!xIsNext);
    };

    const jumpTo = step => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
        console.log(`Step `+step);
        console.log(step%2);
    };

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go back to move #${move}` : `New Game`;
            return (
                <div key={move} className="moves">
                    <button className="movesButton" onClick={() => jumpTo(move)}>{destination}</button>
                </div> 
            )
        })
    );

    return (
        <>
            <h2 class="title">Tic Tac Toe</h2>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="game">
                <p class="result">{winner ? 'The Winner is: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
                {renderMoves()}
            </div>
        </>
    )
};

export default Game;