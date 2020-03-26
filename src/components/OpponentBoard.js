import React from 'react'
import styles from '../sass/gameBoard.module.sass'
import Cell from './Cell'

export function OpponentBoard ({ board, onCellClick }) {
  const renderCells = () =>
    board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell type={cell} onCellClick={() => onCellClick(rowIndex, colIndex)} key={`o${rowIndex}${colIndex}`}>{cell}</Cell>)))

  return (
    <div className={styles.gameBoard}>
      {renderCells()}
    </div>
  )
}
