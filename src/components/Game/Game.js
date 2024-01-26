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
    };

    const renderMoves = () => (
        history.map((_step, move) => {
            const movesDisplay = `Go back to move #${move}`;
            return (
                <div key={move} className="moves">
                    {move!==0 ? (<button className="moves-button" onClick={() => jumpTo(move)}>{movesDisplay}</button> ): ``}
                </div>
            )
        })
    );

    return (
        <>
            <h2 className="title">Tic Tac Toe</h2>
            <p className="intro">This is a game of Tic Tac Toe. You may start by choosing a tile for 'X'. When you make the first 
            move you'll see that you're able to go back and change a move or if you change your mind just keep your original move.</p>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="game">
                <p className="winner">{winner ? `The Winner is: ` + winner + `!!! 🏅` : null}</p>
                <p className="tie">{(!winner && stepNumber===9) ? `It's a Tie! 👔`: null}</p>
                <p className="whos-turn">{(!winner && stepNumber!==9) ? `Current Player: ` + (xIsNext ? `X` : `O`) : null}</p>
                {((stepNumber===0 && !winner) || (stepNumber===0 && winner)) ? null : (<button className="new-game-button" onClick={() => jumpTo(0)}>{`New Game`}</button>)}
                {stepNumber===0 ? `` : renderMoves()}
            </div>
        </>
    )
};

export default Game;