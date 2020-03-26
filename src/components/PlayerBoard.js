import React from 'react'
import styles from '../sass/gameBoard.module.sass'
import Cell from './Cell'
import Ship from './Ship'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../constants/ItemTypes'

function getDndCoords (delta, item) {
  const y = 32 * item.row
  const x = 32 * item.col

  const row = parseInt(Math.round((y + delta.y) / 32), 10)
  const col = parseInt(Math.round((x + delta.x) / 32), 10)
  return { row, col }
}

export function PlayerBoard ({ board, ships, canMoveShip, moveShip }) {
  const [, drop] = useDrop({
    accept: ItemTypes.SHIP,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()

      const { row, col } = getDndCoords(delta, item.coords[0])
      moveShip(item, row, col)
      return undefined
    },
    canDrop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()

      const { row, col } = getDndCoords(delta, item.coords[0])
      return canMoveShip(item, row, col)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const renderCells = () =>
    board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell type={cell} key={`p${rowIndex}${colIndex}`}></Cell>)))

  const renderShips = () => ships.map(ship =>
    <Ship coords={ship.coords}
          id={ship.id}
          length={ship.length}
          orientation={ship.orientation}
          key={ship.id}></Ship>)

  return (
    <div className={styles.gameBoard} ref={drop}>
      {renderCells()}
      {renderShips()}
    </div>
  )
}
