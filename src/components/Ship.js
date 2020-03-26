import React from 'react'
import styles from '../sass/ship.module.sass'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../constants/ItemTypes'

export default function Ship ({ id, length, orientation, coords }) {
  const { row, col } = coords[0]
  // Adjust width and height of "square" for border width
  const style = (isDragging) => ({
    // adjust top-left offset to grid location A1
    top: 32 * row + 0,
    left: 32 * col + 0,
    height: orientation ? 33 : 32 * length + 1,
    width: orientation ? 32 * length + 1 : 33,
    opacity: isDragging ? 0.1 : 1,
    backgroundColor: isDragging ? 'green' : undefined,
  })

  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      length,
      orientation,
      coords,
      type: ItemTypes.SHIP,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div className={styles.ship} style={style(isDragging)} ref={drag}></div>
  )
}
