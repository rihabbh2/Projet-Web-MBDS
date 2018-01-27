import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Video from "./Video";


class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Projet Web MBDS </h1>
        </header>
        <p className="App-intro">
        <code>Bienvenue dans la galerie vidéo du MBDS !</code>
            <p>

        <Video/>
            </p>
        </p>
      </div>
    );
  }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

}

export default App;
