import React from 'react'
import styles from '../sass/buttons.module.sass'

export function Buttons ({ onPlay, onRandom, onReset, started }) {
  return (
    <nav>
      <button onClick={onPlay} className={started ? styles.inactive : undefined}>Play</button>
      <button onClick={onRandom} className={started ? styles.inactive : undefined}>Random</button>
      <button onClick={onReset} className={!started ? styles.inactive : undefined}>Reset</button>
    </nav>
  )
}
