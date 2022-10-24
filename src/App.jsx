
import React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';
import './App.css';


function App() {

const [minutes, setMinutes] = useState('00');
const [seconds, setSeconds] = useState('10');
const [buttonText, setButtonText] = useState('Pause');
const [start, setStart] = useState(false);

const myRef = useRef(null);
//const audio = document.querySelector('#alarm');
const num = {
  0: '00',
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09',
}

function startButton() {
  setStart(true);
  
}

function pauseButton() {
  const resume = 'Resume';

  if (start) {
    setStart(false);
    setButtonText('Resume');
  } else if (!start) {
    setStart(true);
    setButtonText('Pause');
  }
}


/*
function startTimer() {
 
    if (seconds === '00') {
      const intervalMin = setInterval(() => {
        setMinutes(decrementMinutes());
      }, 1000);
      return () => clearInterval(intervalMin);
    } else {
      const intervalSec = setInterval(() => {
        setSeconds(decrementSeconds());
      }, 1000);
      return () => clearInterval(intervalSec);
    }
  }
*/
useEffect(() => {
  if (start === true) {
    if ((seconds === '0' || seconds === '00') && minutes > 0) {
      const intervalMin = setInterval(() => {
        setMinutes(decrementMinutes());
      }, 1000);
      return () => clearInterval(intervalMin);
    } else {
      if (seconds > 0) {
        const intervalSec = setInterval(() => {
          setSeconds(decrementSeconds());
        }, 1000);
        return () => clearInterval(intervalSec);
      }
    }
  }

  const audio = new Audio('../public/assets/Softchime.mp3');
/*
  if (seconds === '00' && minutes === '00') {
    audio.play();
    if (audio.currentTime == 10) {
      audio.currentTime = 0;
      audio.stop();
    }
  }
*/
//Async function needed? This doesn't work.
const playSound = async () => {
    //let path = audio.src;
    //let importRes = await import(path);
    //let sound = new Audio(path);
    audio.type = 'audio/mp3';
    if (seconds === '00' && minutes === '00') {
      await audio.play();
      if (audio.currentTime == 10) {
        audio.currentTime = 0;
        audio.stop();
      }
    }
  }
  playSound();
  

}, [start, minutes, seconds, decrementMinutes, decrementSeconds])

//Functions that change time
function decrementMinutes() {
  let intMinute = Number(minutes);
  intMinute--;
  setSeconds('59');
  if (intMinute < 10) {
    return num[intMinute];
  } else 
  return intMinute.toString();
 
}


function decrementSeconds() {
  let intSeconds = Number(seconds);
  intSeconds--;
  if (intSeconds < 10) {
    return num[intSeconds];
  } else {
    return intSeconds.toString();
  }
  
}

function reset(){
  setStart(false);
  setMinutes('00');
  setSeconds('10');
  setButtonText('Pause');

}

//https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav
//./public/assets/Softchime.mp3
  return (
    <div className="App">
      <h1 id="title">Pomodoro Timer</h1>
        <div id="timer">
          <h1 id="test" dangerouslySetInnerHTML={{__html: minutes}}></h1>
            <div id="colon">
              <h1 id="idk">:</h1>
            </div>
          <h1 id="seconds" dangerouslySetInnerHTML={{__html: seconds}}></h1>
          
        </div>
      <div className="buttons">
        <button id="start" className='button' onClick={startButton}>Start</button>
        <button id="pause" className='button' onClick={pauseButton}>{buttonText}</button>
        <button id="reset" className='button' onClick={reset}>Reset</button>
      </div>
      <div className='setTime'>
        <div id='breakTime'>

        </div>
        <div id='sessionTime'></div>
      </div>
    </div>
  );
}

export default App;
