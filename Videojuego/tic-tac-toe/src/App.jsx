import './App.css';
import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';
import { Square } from './components/Square';
import { TURNS, winner_combos } from './constants';

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage) 
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X // Usa el operador ?? en caso de null
  });
  
const [winner, setWinner] = useState(null); // Estado para ganador null es que hay ganador y false es que no hay un empate 

 const checkEndGame = (newBoard) =>{
  return newBoard.every((square) => square !== null) 
 }

  const updateBoard = (index) => {
    if (board[index] || winner) return ; // Si el cuadrado ya está seleccionado, no hacer nada
    //Actualizar el tablero 
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard); //  x u o 
    //Cambiar el turno  
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //Guardar aqui partida 
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)

    //Verificar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti()
      alert(`El ganador es ${newWinner}`);
      setWinner (() => {
         return newWinner
      })   
    } else if (checkEndGame(newBoard)){
      setWinner(false)//Empate

    }
  };

  const checkWinner = (boardtocheck) => {
    for (const combo of winner_combos) {
      const [a, b, c] = combo;
      if (
        boardtocheck[a] &&
        boardtocheck[a] === boardtocheck[b] &&
        boardtocheck[a] === boardtocheck[c]
      ) {
        return boardtocheck[a]; // Devuelve el ganador ('X' o 'O')
      }
    }
    return null; // Si no hay ganador, retorna null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  };

  useEffect (() => {
    console.log('useEffect')
  }, [board, turn, winner])
  
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}> Reset del juego </button>
      <section className="game">
        {board.map((cell, index) => (
          <Square key={index} index={index} updateBoard={updateBoard} isSelected={false}>
            {cell}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
          <div className='text'>
            <h2>
            {
              winner == false
              ? 'empate'
              : 'Ganoo'
            }
            </h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Emepezar de nuevo</button>
            </footer>
          </div>

          </section>    )
      }
    </main>
  );

}
export default App;
