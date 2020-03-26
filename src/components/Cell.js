import React from 'react'
import styles from '../sass/cell.module.sass'

export default function Cell ({ type, onCellClick }) {
  // EITHER BOARD: mark cell with red square when ship is hit
  if (type === 'X') return <div className={`${styles.opponentCell} ${styles.hitShip}`}>&#128500;</div>
  // OPPONENT BOARD ONLY: mark cell with small black circle and gray background if attack misses ship
  if (type === 'M') return <div className={`${styles.opponentCell} ${styles.missedShip}`}></div>
  // OPPONENT BOARD ONLY: return empty cell with attack click listener
  if (onCellClick !== undefined)
    // Uncomment type === 'S' line below to show opponent's ships
    return <div className={styles.opponentCell} onClick={onCellClick}>
      {/*{type === 'S' && type}*/}
    </div>
  // PLAYER BOARD ONLY: return empty cell
  return <div className={styles.playerCell}></div>
}
