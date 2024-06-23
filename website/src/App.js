import logo from './logo.svg';
import './index.css';
import './App.css';
import { useEffect } from "react";
import { useState } from "react";
import React from 'react';
import YouTube from 'react-youtube';
import Canvas from './Canvas'

function App() {

  const [menuOut, setMenuOut] = useState(false)
  const [infoOut, setInfoOut] = useState(false)
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCode, setVideoCode] = useState("");

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

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

  //Load video
  const loadVideo = () =>{
    if(document.getElementById("YTurl")){

      setVideoUrl(document.getElementById("YTurl").value);
      console.log(videoUrl);

      if (videoUrl) {
        if(videoUrl.includes("v=") && videoUrl.includes("&")){
          setVideoCode(videoUrl.split("v=")[1].split("&")[0]);
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
  }, [menuOut, infoOut, videoCode]);

  // App content
  return (
    <div className="App">
      <header className="App-header">
        <img id="Menu-button" src="hamburger-menu.svg" onClick={()=>slideOutMenu("menu")}></img>
        <h2>WEB BASED RYTHM GAME</h2>
        <img id="Info-button" src="info.svg" onClick={()=>slideOutMenu("info")}></img>
      </header> 

      <div className="App-content">

        {/*
        <YouTube className='YT-iFrame'  opts={opts} videoId={videoCode}></YouTube>
        */}
        <Canvas draw={draw} options={'2d'}/>

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
                <div className='Menu-item'>
                  <b>Select Track</b><br></br>
                  <label for="YTurl">YouTube URL:</label>
                  <input type="text" id="YTurl" name="YTurlField" autoComplete="off"/>
                  <input type="submit" id="YTsub" value="Select" onClick={()=>loadVideo()}/>
                </div>
                <div className='Menu-item'>
                  <b>Options</b>
                </div>
                <div className='Menu-item'>
                  <b>Credits</b>
                  <p>Created by Philip Robertsson</p>
                  <p>Might break the Youtube TOS</p>
                </div>
            </div>
        </div>

        <div id="Instruction-window">
            <h3 style={{paddingRight:"2em"}}>Info</h3>
            <img className="Close-button" src="close.svg" onClick={()=>slideOutMenu("info")}></img>
            <div style={{width:"100vw", height:"100vw"}}>
              <div className='Menu-item'>
                    <b>Chose track</b>
                    <p>In the left hand side menu you can chose a track you want to play under the tab <i>Select Track</i>.</p>
              </div>
              <div className='Menu-item'>
                    <b>Controls</b>
                    <p>Simply hit the <i>Spacebar</i> once a note reaches the middle of the yellow <i>judgment zone</i>, if you time it right you score.</p>
              </div>
              <div className='Menu-item'>
                    <b>Shortcuts</b>
                    <p>You can access the left hand side menu by pressing <i>Esc</i>, while this menu is accessed by pressing <i>I</i>. These keys also close the respective menus.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
