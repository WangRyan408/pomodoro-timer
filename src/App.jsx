
import React from 'react';
import { useState, useRef } from 'react';
import './App.css';

function App() {

const [timer, setTimer] = useState('25:00');







  return (
    <div className="App">
      <h1 id="test" dangerouslySetInnerHTML={{__html: timer}}></h1>
      <div>
        <button id="start" className='buttons'>Start</button>
          <button id="pause" className='buttons'>Pause</button>
          <button id="reset" className='buttons'>Reset</button>
          </div>
    </div>
  );
}

export default App;
