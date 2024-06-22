import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import { useState } from "react";
import React from 'react';

function App() {

  const [menuOut, setMenuOut] = useState(false)
  const [infoOut, setInfoOut] = useState(false)

  // Slide Out Menus
  const slideOutMenu = (option) => {
    if(document.getElementById("Menu-window")){
      if(option == "menu"){
        if(menuOut == false){
          setMenuOut(true);
          console.log("Menu Out");
          document.getElementById("Menu-window").style.display="flex";
          document.getElementById("Menu-window").style.animation = "slideInLeft 0.2s linear";
        }else{
          setMenuOut(false);
          console.log("Menu In");
          document.getElementById("Menu-window").style.animation = "slideOutLeft 0.2s linear";
          setTimeout(function() {
            document.getElementById("Menu-window").style.display="none";
          }, 190);
        }
      }
      if(option == "info"){
        if(infoOut == false){
          setInfoOut(true);
          console.log("Info Out")
          document.getElementById("Instruction-window").style.display="flex";
          document.getElementById("Instruction-window").style.animation = "slideInRight 0.2s linear";
        }else{
          setInfoOut(false);
          console.log("Info In")
          document.getElementById("Instruction-window").style.animation = "slideOutRight 0.2s linear";
          setTimeout(function() {
            document.getElementById("Instruction-window").style.display="none";
          }, 190);
        }
      }
    }
  }

  

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
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [menuOut, infoOut]);

  // App content
  return (
    <div className="App">
      <header className="App-header">
        {/*TODO: Fix bug where both menus cant be opened simultaniously from the navbar icons*/}
        <img id="Menu-button" src="hamburger-menu.svg" onClick={()=>slideOutMenu("menu")}></img>
        <h3>WEB BASED RYTHM GAME</h3>
        <img id="Info-button" src="info.svg" onClick={()=>slideOutMenu("info")}></img>
      </header> 

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
      <div className="Menus-container">
        <div id="Menu-window">
            <img className="Close-button" src="close.svg" onClick={()=>slideOutMenu("menu")}></img>
            <h3 style={{paddingLeft:"2em"}}>Menu</h3>
            <div style={{width:"100vw", height:"100vw"}}>

            </div>
        </div>

        <div id="Instruction-window">
            <h3 style={{paddingRight:"2em"}}>Info</h3>
            <img className="Close-button" src="close.svg" onClick={()=>slideOutMenu("info")}></img>
            <div style={{width:"100vw", height:"100vw"}}>

            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
