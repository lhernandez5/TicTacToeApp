import React , {useState} from "react";
import Board from "../Board/Board";
import { calculateWinner } from "../../helpers";
import "./Game.css"

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const showWinner = false; 

    const handleClick = i => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current];
        //if user clicks an occupied space or if the game is won, return
        if(winner || squares[i]) return;
        //put an X or an O in the clicked square
        squares[i] = xIsNext ? 'X' : 'O';
        console.log(squares[i]);
        setHistory([...timeInHistory, squares]);
        console.log("time in history: "+timeInHistory+ " squares: "+squares);
        setStepNumber(timeInHistory.length);
        console.log("time in history: "+timeInHistory.length);
        setXisNext(!xIsNext);
    };

    const jumpTo = step => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
        console.log(`JumpTo func-->Step `+step);
        console.log("Mod func-->"+step%2);
    };

    const shouldShowWinner = (winner) =>{
        if(winner){
            shouldShowWinner=true;
        }
        shouldShowWinner=false;
    };

    const renderMoves = () => (
        history.map((_step, move) => {
            // const destination = move ? `Go back to move #${move}` : `New Game`;
            const destination = move ? `Go back to move #${move}` : `New Game`;
            console.log("move "+ move +" "+ typeof(move));
            console.log("step "+ _step +" "+ typeof(_step));
            return (
                <div key={move} className="moves">
                    {/* <button onClick={() => }>{newGame}</button> */}
                    <button className="movesButton" onClick={() => jumpTo(move)}>{destination}</button>
                </div> 
            )
        })
    );

    return (
        <>
            <h2 className="title">Tic Tac Toe</h2>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="game">
                <p className="winner">{winner ? 'The Winner is: ' + winner : null}</p>
                <p className="result">{'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
                {renderMoves()}
            </div>
        </>
    )
};

export default Game;