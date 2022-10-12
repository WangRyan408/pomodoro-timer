
import React from 'react';
import { useState, useRef } from 'react';
import './App.css';

function App() {

const [minutes, setMinutes] = useState('25');
const [seconds, setSeconds] = useState('00');

function thing() {
  
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
        <button id="start" className='buttons'>Start</button>
        <button id="pause" className='buttons'>Pause</button>
        <button id="reset" className='buttons'>Reset</button>
      </div>
    </div>
  );
}

export default App;
