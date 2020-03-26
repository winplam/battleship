import React from 'react'
import '../sass/notifications.sass'

export function Notification ({ started, winner, whoseTurn }) {
  return (
    <aside>
      <span>{!started && 'Your grid ↑'}</span>
      {!started && !winner && <span>Place ships</span>}
      {started && !winner && <span>{whoseTurn}</span>}
      {started && winner && <span>{winner} won the game</span>}
      <span style={{ float: 'right' }}>{!started && 'Opponent\'s grid'}</span>
    </aside>
  )
}
