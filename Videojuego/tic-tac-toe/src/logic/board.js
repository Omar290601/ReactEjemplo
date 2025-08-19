import { winner_combos } from "../constants";
export const checkWinner = (boardtocheck) => {
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