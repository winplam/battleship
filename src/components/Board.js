import React from 'react'
import styles from '../sass/board.module.sass'

export default function Board ({ children, className }) {
  return (
    <div className={`${className} ${styles.boardContainer}`}>
      <div className={styles.lettersCaption}>
        <div className={styles.captionText}>A</div>
        <div className={styles.captionText}>B</div>
        <div className={styles.captionText}>C</div>
        <div className={styles.captionText}>D</div>
        <div className={styles.captionText}>E</div>
        <div className={styles.captionText}>F</div>
        <div className={styles.captionText}>G</div>
        <div className={styles.captionText}>H</div>
        <div className={styles.captionText}>I</div>
        <div className={styles.captionText}>J</div>
      </div>
      <div className={styles.numbersCaption}>
        <div className={styles.captionText}>1</div>
        <div className={styles.captionText}>2</div>
        <div className={styles.captionText}>3</div>
        <div className={styles.captionText}>4</div>
        <div className={styles.captionText}>5</div>
        <div className={styles.captionText}>6</div>
        <div className={styles.captionText}>7</div>
        <div className={styles.captionText}>8</div>
        <div className={styles.captionText}>9</div>
        <div className={styles.captionText}>10</div>
      </div>
      {children}
    </div>
  )
}
