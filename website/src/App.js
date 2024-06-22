import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import React from 'react';

function App() {
  
  // Keyboard events
  useEffect(() => {
    function handleKeyDown(e) {
      if(e.code == "Space"){
        console.log(e.code);
        console.log("Judge player in judgment zone");
      }
      if(e.code == "Escape"){
        console.log(e.code);
        console.log("Open menu");
      }
      if(e.code =="KeyI"){
        console.log(e.code);
        console.log("Open instructions");
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // App content
  return (
    <div className="App">
      <header className="App-header">
        <button className="Menu-button">MENU</button>
        <h3>WEB BASED RYTHM GAME</h3>
        <button className="Info-button">INFO</button>
      </header>

      <div className="App-content">
        <div className="Score-Window">
          <p>score</p>
        </div>

        <div className="Note-line">
            <div className="Judgement-zone">

            </div>
            <div className="Missed-box">

            </div>
        </div>

        <div className="Instruction-window">
          <h3>Instructions</h3>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
               sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
               in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
               occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </div>

      </div>
    </div>
  );
}

export default App;
