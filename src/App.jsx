
import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';




//TODO:
function App() {
const [mode, setMode] = useState('Session');
const [minutes, setMinutes] = useState('25');
const [seconds, setSeconds] = useState('00');
const [buttonText, setButtonText] = useState('Pause');
const [start, setStart] = useState(false);
const [breakTime, setBreakTime] = useState({
  breakMinutes: '05',
});

const [sessionTime, setSessionTime] = useState({
  sessionMinutes: '25',
})

const audio = document.querySelector('#beep');

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
  //setStart(true);
  pauseButton();
}

function pauseButton() {
  if (start) {
      setStart(false);
      //setButtonText('Resume'); 
      console.log({
        'Start Status:': start,
        'Button Text:': buttonText,
        'Minutes:': minutes,
        'Seconds:': seconds
      });
  } 
  //else if (!start && buttonText !== 'Pause')
  else if (!start) {
      setStart(true);
      setButtonText('Pause');

      console.log({
        'Start Status:': start,
        'Button Text:': buttonText,
        'Minutes:': minutes,
        'Seconds:': seconds
      })
  }
}


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
          console.log({'Seconds:': seconds});
        }, 1000);
        return () => clearInterval(intervalSec);
      }
    }
  }

  //const audio = new Audio('./assets/Softchime.mp3');

  if (seconds === '00' && minutes === '00') {
    if (audio.paused && audio.currentTime === 0) {
      setTimeout(() => {
        audio.play();
  
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 7000);
      }, 1000);
      if (mode === "Session") {
        setMode('Break');
        setMinutes(breakTime.breakMinutes);
      }
      else if (mode === 'Break') {
        setMode('Session');
        setMinutes(sessionTime.sessionMinutes);
      }

    } 
    else if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    
  }
}, [start, minutes, seconds, decrementMinutes, decrementSeconds, mode, breakTime.breakMinutes, sessionTime.sessionMinutes, audio])

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

// Increment Buttons
function incrementBreakMin() {
  let intMinute = Number(breakTime.breakMinutes);
  if (start === false) {
    if (intMinute < 60) {
      intMinute++;
    }
      if (intMinute < 10) {
        setBreakTime({
          ...breakTime,
          breakMinutes: num[intMinute]});
          if (mode === 'Break') {
            setMinutes(num[intMinute]);
          }
      } else 
      setBreakTime({
        ...breakTime,
        breakMinutes: intMinute.toString()});
        if (mode === 'Break') {
          setMinutes(intMinute.toString());
        }
  }
}

function decrementBreakMin() {
  let intMinute = Number(breakTime.breakMinutes);
  if (start === false) {
    if (intMinute > 1) {
      intMinute--;
    }
    if (intMinute < 10) {
      setBreakTime({
        ...breakTime,
        breakMinutes: num[intMinute]});
        if (mode === 'Break') {
          setMinutes(num[intMinute]);
        }
    } else 
    setBreakTime({
      ...breakTime,
      breakMinutes: intMinute.toString()});
      if (mode === 'Break') {
        setMinutes(intMinute.toString());
      }
  }
  
}


function incrementSessionMin() {
  let intMinute = Number(sessionTime.sessionMinutes);
  if (start === false) {
    if (intMinute < 60) {
      intMinute++;
    }
    if (intMinute < 10) {
      setSessionTime({
        ...sessionTime,
        sessionMinutes: num[intMinute]});
        if (mode === 'Session') {
          setMinutes(num[intMinute]);
        }
    } else {
      setSessionTime({
        ...sessionTime,
        sessionMinutes: intMinute.toString()});
        if (mode === 'Session') {
          setMinutes(intMinute.toString());
        }
    }
    
  }
}

function decrementSessionMin() {
  let intMinute = Number(sessionTime.sessionMinutes);
  if (start === false) {
    if (intMinute > 1) {
      intMinute--;
    }
    if (intMinute < 10) {
      setSessionTime({
        ...sessionTime,
        sessionMinutes: num[intMinute]});
        if (mode === 'Session') {
          setMinutes(num[intMinute]);
        }
    } else {
      setSessionTime({
        ...sessionTime,
        sessionMinutes: intMinute.toString()});
        if (mode === 'Session') {
          setMinutes(intMinute.toString());
        }
    }
    
  }
}

function clockify() {
      let min = minutes;
      let sec = seconds;
      return min + ':' + sec;
   }

function reset(){
  setStart(false);
  setMinutes('25');
  setSeconds('00');
  setBreakTime({
    ...breakTime,
      breakMinutes: '5'
  });
  setSessionTime({
    ...sessionTime,
      sessionMinutes: '25'
  });
  setButtonText('Pause');
  setMode("Session");
  audio.pause();
  audio.currentTime = 0;
}
/**
 * <h1 id="time-left" >{clockify()}</h1>
 * 
 *  Original format:
 * <h1 id="time-left">{minutes}</h1>
            <div id="colon">
              <h1 id="idk">:</h1>
            </div>
          <h1 id="seconds">{seconds}</h1>
 */



  return (
    <div className="App">
      <h1 id="title">Pomodoro Timer</h1>
      <h2 id="timer-label">{mode}</h2>
        <div id="timer">
        <h1 id="time-left" >{clockify()}</h1>
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
      <div className="buttons">
        <button id="start_stop" className='button' onClick={startButton}>Start</button>
        <button id="pause" className='button' onClick={pauseButton}>{buttonText}</button>
        <button id="reset" className='button' onClick={reset}>Reset</button>
      </div>
      <div className='setTime'>
        <div id='breakTime'>
          <h2 id="break-label">Break Time</h2>
            <div className="timer">
              <button className='arrow arrow-left' id="break-increment" onClick={incrementBreakMin}>↑</button>
              <h3 id="break-length">{breakTime.breakMinutes}</h3>
              
              <button className='arrow arrow-right' id="break-decrement" onClick={decrementBreakMin}>&darr;</button>
            </div>
        </div>
        <div id='sessionTime'>
          <h2 id="session-label">Session Time</h2>
          <div className="timer">
          <button className='arrow arrow-left' id="session-increment" onClick={incrementSessionMin}>↑</button>
              <h3 id="session-length">{sessionTime.sessionMinutes}</h3>
              <button className='arrow arrow-right' id="session-decrement" onClick={decrementSessionMin}>&darr;</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
