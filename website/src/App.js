import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import { useState } from "react";
import React from 'react';

function App() {

  const [menuOut, setMenuOut] = useState(false)
  const [infoOut, setInfoOut] = useState(false)


  useEffect(() => {
    // Keyboard events
    function handleKeyDown(e) {
      if(e.code == "Space"){
        console.log(e.code);
        console.log("Judge player in judgment zone");
      }
      if(e.code == "Escape"){
        slideOutMenu("menu");
      }
      if(e.code =="KeyI"){
        slideOutMenu("info");
      }
    }
    // Slide Out Menus
    function slideOutMenu(option){
      if(option == "menu"){
        if(menuOut == false){
          setMenuOut(true);
          console.log("Menu Out")
          document.getElementById("Menu-window").style.display="flex";
        }else{
          setMenuOut(false);
          console.log("Menu In")
          document.getElementById("Menu-window").style.display="none";
        }
      }
      if(option == "info"){
        if(infoOut == false){
          setInfoOut(true);
          console.log("Info Out")
          document.getElementById("Instruction-window").style.display="flex";
        }else{
          setInfoOut(false);
          console.log("Info In")
          document.getElementById("Instruction-window").style.display="none";
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [menuOut, infoOut]);

  // App content
  return (
    <div className="App">
      <header className="App-header">
        <button className="Menu-button">MENU</button>
        <h3>WEB BASED RYTHM GAME</h3>
        <button className="Info-button">INFO</button>
      </header>

      <div className="Menus-container">
        <div id="Menu-window">
            <h3>Menu</h3>
        </div>

        <div id="Instruction-window">
            <h3>Instructions</h3>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </div>
      </div>
        
      <div className="App-content">

        <div className="Score-Window">
          <p>score</p>
        </div>

        <div className="Note-line">
            <div className="Judgement-zone">

            </div>
            {/*<div className="Missed-box">

            </div>*/}

        </div>

      </div>
    </div>
  );
}

export default App;
