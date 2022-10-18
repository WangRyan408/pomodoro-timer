
import React from 'react';
import { useState, useRef } from 'react';
import './App.css';

function App() {

const [minutes, setMinutes] = useState('25');
const [seconds, setSeconds] = useState('00');

function startButton() {
  startTimer();
  console.log({'Minutes': minutes});
  console.log({'Seconds': seconds});
}

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



//Functions that change time
function decrementMinutes() {
  let intMinute = Number(minutes);
  intMinute--;
  setSeconds('59');
  return intMinute.toString();
 
}


function decrementSeconds() {
  let intSeconds = Number(seconds);
  intSeconds--;
  return intSeconds.toString();
}

function reset(){
  setMinutes('25');
  setSeconds('00');
}

  return (
    <div className="App">
      <div id="timer">
        <h1 id="test" dangerouslySetInnerHTML={{__html: minutes}}></h1>
        <div id="colon">
          <h1 id="idk">:</h1>
          </div>
        <h1 id="seconds" dangerouslySetInnerHTML={{__html: seconds}}></h1>
      </div>
      <div>
        <button id="start" className='buttons' onClick={startButton}>Start</button>
        <button id="pause" className='buttons'>Pause</button>
        <button id="reset" className='buttons' onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
