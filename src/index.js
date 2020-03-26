import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Game from './components/Game'
import './components/Footer'
import './sass/root.sass'
import './sass/reset.module.sass'
import './sass/index.module.sass'

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <Game/>
    <summary/>
  </React.StrictMode>,
  document.getElementById('root')
)
