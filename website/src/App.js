import logo from './logo.svg';
import './index.css';
import './App.css';
import { useEffect } from "react";
import { useState } from "react";
import React from 'react';
import YouTube from 'react-youtube';
import Canvas from './Canvas'

function App() {

  // States
  const [menuOut, setMenuOut] = useState(false)
  const [infoOut, setInfoOut] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [videoCode, setVideoCode] = useState("")
  const [spaceDown, setSpaceDown] = useState(false)
  const [scored, setScored] = useState(false)
  const [points, setPoints] = useState(0)

  // Variables
  const speed = 5.0
  const track =  []

  // Note struct
  var Note = {
    'Scored': false, // If the note has been hit, used to decide if the note should be rendered
    'Offset': 0,      //  Distance to previous note, used toghether with framecount in drawNoteLine()
  }


  // Rezise a canvas element to desired size, uses the ctx.canvas element from the draw function
  // This is responsive at the moment
  const resizeCanvasToDisplaySize = (canvas, width, height) =>{

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      return true //Return nothing
    }
    return false //There's nothing to change
  }

  // Code to draw the note line as a canvas, is used in Canvas.js
  const drawNoteLine = (ctx, frameCount) => {
    if(spaceDown){
      resizeCanvasToDisplaySize(ctx.canvas, window.screen.width*0.8, 20+10) // Slightly increase height of the note line when space is pressed
      if(frameCount >= ctx.canvas.width*0.8 && frameCount <= ctx.canvas.width && !scored){
        setScored(true)
        setPoints(points+1)
      }
    }else{
      resizeCanvasToDisplaySize(ctx.canvas, window.screen.width*0.8, 20) // Space is not pressed keep the origninal height
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    //Red part
    ctx.fillStyle = '#cc3333'
    ctx.beginPath()
    ctx.rect(0, 0, ctx.canvas.width*0.8, ctx.canvas.height)
    ctx.fill()

    // Yellow part
    ctx.fillStyle = '#cccc33'
    ctx.beginPath()
    ctx.rect(ctx.canvas.width*0.8, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fill()

    // Dividing line
    ctx.fillStyle = '#161616'
    ctx.beginPath()
    ctx.rect((ctx.canvas.width*0.8)-1, 0,1, ctx.canvas.height)
    ctx.fill()


    // Moving note, might add loop here to add multipe notes or some function
    for(let i = 0; i<track.length; i++){
      if(!track[i].scored){
        ctx.fillStyle = '#336633'
        ctx.beginPath()
        if(spaceDown){
          ctx.arc(Number(frameCount-track[i].Offset), ctx.canvas.height/2, (ctx.canvas.height/2)-5, 0, (ctx.canvas.height*Math.PI)/2);
        }else{
          ctx.arc(Number(frameCount-track[i].Offset), ctx.canvas.height/2, ctx.canvas.height/2, 0, (ctx.canvas.height*Math.PI)/2);
          console.log("Drew note " + Number(i) + " at position: " + Number(frameCount-track[i].Offset))
        }
      }
      ctx.fill()
    }
  }

  // Slide Out Menus
  const slideOutMenu = (option) => {
    if(document.getElementById("Menu-window")){ // Check if element exists
      
      // Left hand side menu
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

      // Right hand side menu
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

  //Load video, not used at the moment
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

  //Create track, with an amount of notes corresponding to numNotes
  const createTrack = (numNotes) =>{
    for(let i=0; i<numNotes; i++){
      Note.scored = false;
      if(i == 0){ //First note, should not have a offset
        Note.Offset = Number(0);
      }else{
        Note.Offset = (track[i-1].Offset)+10
      }
      track.push(Note);
      console.log("Note " + Number(i) + " offset: " + Number(track[i].Offset))
    }
  }


  useEffect(() => {
    // Keyboard events
    function handleKeyDown(e) {
      if(e.code == "Space"){ //Space pressed, bools used in drawNoteLine()
        setSpaceDown(true);
        setTimeout(function() {
          setSpaceDown(false);
        }, 50);
      } 
      if(e.code == "Escape"){ // Esc pressed, opens or closes the left hand side menu
        slideOutMenu("menu");
      }
      if(e.code =="KeyI"){ // I pressed, opens or closes the right hand side menu
        slideOutMenu("info");
      }
      if(e.code == "KeyC"){
        createTrack(10);
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    //Remove event listener after use
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [menuOut, infoOut/*, videoCode*/]);

  // App content
  return (
    <div className="App">

      {/*Navigation bar*/}
      <header className="App-header">
        <img id="Menu-button" src="hamburger-menu.svg" onClick={()=>slideOutMenu("menu")}></img>
        <h2>WEB BASED RYTHM GAME</h2>
        <img id="Info-button" src="info.svg" onClick={()=>slideOutMenu("info")}></img>
      </header> 

      {/*Game field*/}
      <div className="App-content">

        {/* Might use this to avoid breaking the YouTube TOS
        <YouTube className='YT-iFrame'  opts={opts} videoId={videoCode}></YouTube>
        */}

        <Canvas id="Note-line" draw={drawNoteLine} options={['2d',speed]}/>
        <p>Score: {points}</p>
        
      </div>

      {/*Container holding the slide out menus*/}
      <div className="Menus-container">
        <div id="Menu-window"> {/*The left hand side menu*/}
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

        <div id="Instruction-window"> {/*The right hand side menu*/}
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
