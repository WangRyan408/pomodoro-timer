
import React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';
import './App.css';


function App() {

const [minutes, setMinutes] = useState('00');
const [seconds, setSeconds] = useState('10');
const [buttonText, setButtonText] = useState('Pause');
const [start, setStart] = useState(false);
const [breakTime, setBreakTime] = useState({
  breakMinutes: '01',
  breakSeconds: '00',
});

const [sessionTime, setSessionTime] = useState({
  sessionMinutes: '25',
  sessionSeconds: '00'
})


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
      console.log({
        'Start Status:': start,
        'Button Text:': buttonText,
        'Minutes:': minutes,
        'Seconds:': seconds
      });
  } 
  else if (!start && buttonText !== 'Pause') {
    if (minutes !== '00' && seconds !== '00'){
      setStart(true);
      setButtonText('Pause');
    }
      console.log({
        'Start Status:': start,
        'Button Text:': buttonText,
        'Minutes:': minutes,
        'Seconds:': seconds
      })
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
        //console.log({'Minutes': minutes});
      }, 1000);
      return () => clearInterval(intervalMin);
    } else {
      if (seconds > 0) {
        const intervalSec = setInterval(() => {
          setSeconds(decrementSeconds());
          console.log({'Seconds:': seconds});
        }, 1000);
        return () => clearInterval(intervalSec);
      }
    }
  }

  const audio = new Audio('./assets/Softchime.mp3');

  if (seconds === '00' && minutes === '00') {
    if (audio.paused && audio.currentTime === 0) {
      setTimeout(() => {
        //audio.currentTime = 0;
        audio.play();
  
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 7000);
      }, 1000);
    } 
    else if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    
    /*
    if (audio.currentTime == 10) {
      audio.currentTime = 0;
      audio.stop();
    } */
  }

//Async function needed? This doesn't work.
/*
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
*/
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

function sessionToTimer() {
  setMinutes(sessionTime.sessionMinutes);
}

function incrementBreakMin() {
  let intMinute = Number(breakTime.breakMinutes);
  if (intMinute < 60) {
    intMinute++;
  }
  if (intMinute < 10) {
    setBreakTime({
      ...breakTime,
      breakMinutes: num[intMinute]});
  } else 
  setBreakTime({
    ...breakTime,
    breakMinutes: intMinute.toString()});
}

function decrementBreakMin() {
  let intMinute = Number(breakTime.breakMinutes);
  if (intMinute > 1) {
    intMinute--;
  }
  if (intMinute < 10) {
    setBreakTime({
      ...breakTime,
      breakMinutes: num[intMinute]});
  } else 
  setBreakTime({
    ...breakTime,
    breakMinutes: intMinute.toString()});
}


function incrementMinButton() {
  let intMinute = Number(sessionTime.sessionMinutes);
  if (intMinute < 60) {
    intMinute++;
  }
  if (intMinute < 10) {
    setSessionTime({
      ...sessionTime,
      sessionMinutes: num[intMinute]});
  } else 
  setSessionTime({
    ...sessionTime,
    sessionMinutes: intMinute.toString()});
}

function decrementMinButton() {
  let intMinute = Number(sessionTime.sessionMinutes);
  if (intMinute > 1) {
    intMinute--;
  }
  if (intMinute < 10) {
    setSessionTime({
      ...sessionTime,
      sessionMinutes: num[intMinute]});
  } else 
  setSessionTime({
    ...sessionTime,
    sessionMinutes: intMinute.toString()});
}




function reset(){
  setStart(false);
  setMinutes('00');
  setSeconds('10');
  setButtonText('Pause');

}
//This works. But why?
//https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav

//This doesn't work? ????? WHYYYYYY
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
          <h2>Break Time</h2>
            <div className="timer">
              <button className='arrow arrow-left' onClick={incrementBreakMin}>↑</button>
              <h3 dangerouslySetInnerHTML={{__html: breakTime.breakMinutes}}></h3>
              <h3>:</h3>
              <h3 dangerouslySetInnerHTML={{__html: breakTime.breakSeconds}}></h3>
              <button className='arrow arrow-right' onClick={decrementBreakMin}>&darr;</button>
            </div>
        </div>
        <div id='sessionTime'>
          <h2>Session Time</h2>
          <div className="timer">
          <button className='arrow arrow-left' onClick={incrementMinButton}>↑</button>
              <h3 dangerouslySetInnerHTML={{__html: sessionTime.sessionMinutes}}></h3>
              <h3>:</h3>
              <h3 dangerouslySetInnerHTML={{__html: sessionTime.sessionSeconds}}></h3>
              <button className='arrow arrow-right' onClick={decrementMinButton}>&darr;</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
