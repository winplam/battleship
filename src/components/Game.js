import React, { useEffect, useState } from 'react'
import { Buttons } from './Buttons'
import { Notification } from './Notification'
import { OpponentBoard } from './OpponentBoard'
import { PlayerBoard } from './PlayerBoard'
import Board from './Board'
import Opponent from '../game/Opponent'
import Player from '../game/Player'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import uuidv4 from 'uuid/v4'

let player = Player()
let opponent = Opponent()

export default function Game () {
  const [playerBoard, setPlayerBoard] = useState([])
  const [opponentBoard, setOpponentBoard] = useState([])
  const [ships, setShips] = useState([])
  const [started, setStarted] = useState(false)
  const [winner, setWinner] = useState('')
  const [whoseTurn, setWhoseTurn] = useState('Your turn')

  const initializeGame = () => {
    player = Player()
    player.placeShips()
    opponent = Opponent()
    opponent.placeShips()
    setPlayerBoard(player.getGameBoard())
    setOpponentBoard(opponent.getGameBoard())
    // use spread syntax to insert uuid into preexisting ship object
    setShips(player.getShips().map(ship => ({ ...ship, id: uuidv4(), })))
    setStarted(false)
    setWhoseTurn('Your turn')
    setWinner('')
  }

  useEffect(() => initializeGame(), [])

  const canMoveShip = (ship, row, col) => {
    if (!started) {
      if (ship.row === row && ship.col === col) {
        return false
      }
      return player.canMoveShip(ship, row, col)
    }
  }

  const moveShip = (ship, row, col) => {
    const movedShip = player.moveShip(ship, row, col)
    const { id } = ship
    setShips(ships.map(s => (s.id !== id ? s : { ...movedShip, id })))
  }

  const opponentTurn = () => {
    setTimeout(() => {
      const attackResult = opponent.attack(player)
      setPlayerBoard([...player.getGameBoard()])
      if (player.haveLost()) {
        setWinner('Computer')
        return
      }
      if (attackResult) {
        opponentTurn()
        return
      }
      setWhoseTurn('Your turn')
    }, 300)
  }

  const playerTurn = (row, col) => {
    const attackResult = player.attack(opponent, row, col)
    setOpponentBoard(opponent.getAttackBoard())
    if (opponent.haveLost()) {
      setWinner('You')
      return
    }
    if (attackResult) return
    setWhoseTurn('Computers turn')
    opponentTurn()
  }

  // function pasted all the way down to cell to get (row, col) number that was clicked
  const handleCellClick = (row, col) => {
    if (started && !winner && whoseTurn === 'Your turn') {
      playerTurn(row, col)
    }
  }

  const handlePlay = () => {
    if (!started) {
      setStarted(true)
    }
  }

  const handleRandom = () => {
    // randomize placement of player ships if game has not started
    if (!started) {
      player.randomizeShips()
      setShips(player.getShips().map(ship => ({
        ...ship,
        id: uuidv4(),
      })))
      setPlayerBoard(player.getGameBoard())
      // randomize placement of opponent ships
      opponent.randomizeShips()
      setOpponentBoard(opponent.getGameBoard())
    }
  }

  const handleReset = () => {
    // reset the game
    if (started) initializeGame()
  }

  return (
    <DndProvider backend={Backend}>
      <Buttons onPlay={handlePlay} onRandom={handleRandom} onReset={handleReset} started={started} winner={winner}/>
      <Board className={'playerBoard'}>
        <PlayerBoard board={playerBoard} ships={ships} canMoveShip={canMoveShip} moveShip={moveShip}/>
      </Board>
      <Notification started={started} winner={winner} whoseTurn={whoseTurn}/>
      <Board className={'opponentBoard'}>
        <OpponentBoard board={opponent.getGameBoard()} onCellClick={handleCellClick}/>
      </Board>
    </DndProvider>
  )
}
