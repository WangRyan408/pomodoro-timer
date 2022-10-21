
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

const [minutes, setMinutes] = useState('00');
const [seconds, setSeconds] = useState('10');
const [buttonText, setButtonText] = useState('Pause');
const [start, setStart] = useState(false);
const [pause, setPause] = useState(false);


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
  } else {
    setStart(true);
    setButtonText('Pause');
  }
}

function resetButton() {

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
/*
  if (!start) {
    reset();
    return reset();
  }*/
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
  setMinutes('25');
  setSeconds('00');
  setButtonText('Pause');

}

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
      <div>
        <button id="start" className='buttons' onClick={startButton}>Start</button>
        <button id="pause" className='buttons' onClick={pauseButton}>{buttonText}</button>
        <button id="reset" className='buttons' onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
