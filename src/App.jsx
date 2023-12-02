
import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

//TODO:
function App() {
  //UseState Hooks to hold/modify UI State
  const [mode, setMode] = useState('Session');
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [buttonText, setButtonText] = useState('Pause');
  const [start, setStart] = useState(false);
  const [breakTime, setBreakTime] = useState({
    breakMinutes: '5',
    breakSeconds: '00'
  });
  
  const [sessionTime, setSessionTime] = useState({
    sessionMinutes: '25',
    sessionSeconds: '00'
  })
  
  const audio = document.querySelector('#beep'); // Selects audio tag/element
  
 
  //Appending zeros to single digits.
  const numMemo = useMemo(() => {
    return {
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
  }, []);

 
  
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
  
  const minuteCallback = useCallback(decrementMinutes, [minutes, numMemo]);
  const secondCallback = useCallback(decrementSeconds, [numMemo, seconds]);


  function decrementMinutes() {
    let intMinute = Number(minutes);
    intMinute--;
    setSeconds('59');
    if (intMinute < 10) {
      return numMemo[intMinute];
    } else 
    return intMinute.toString();
   
  }
  
  
  function decrementSeconds() {
    let intSeconds = Number(seconds);
    intSeconds--;
    if (intSeconds < 10) {
      return numMemo[intSeconds];
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
            breakMinutes: intMinute.toString()});
            if (mode === 'Break') {
              setMinutes(numMemo[intMinute]);
              setSeconds('00');
            }
        } else 
        setBreakTime({
          ...breakTime,
          breakMinutes: intMinute.toString()});
          if (mode === 'Break') {
            setMinutes(intMinute.toString());
            setMinutes('00');
          }
    }
  }

  function incrementBreakMin5() {
    let intMinute5 = Number(breakTime.breakMinutes);
    if (start === false) {
      if (intMinute5 < 60) {
        intMinute5+=5;
      }
        if (intMinute5 < 10) {
          setBreakTime({
            ...breakTime,
            breakMinutes: intMinute5.toString()});
            if (mode === 'Break') {
              setMinutes(numMemo[intMinute5]);
              setSeconds('00');
            }
        } else 
        setBreakTime({
          ...breakTime,
          breakMinutes: intMinute5.toString()});
          if (mode === 'Break') {
            setMinutes(intMinute5.toString());
            setMinutes('00');
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
          breakMinutes: intMinute.toString()});
          if (mode === 'Break') {
            setMinutes(numMemo[intMinute]);
            setSeconds('00');
          }
      } else 
      setBreakTime({
        ...breakTime,
        breakMinutes: intMinute.toString()});
        if (mode === 'Break') {
          setMinutes(intMinute.toString());
          setSeconds('00');
        }
    }
    
  }
  
  function decrementBreakMin5() {
    let intMinute = Number(breakTime.breakMinutes);
    if (start === false) {
      if (intMinute > 1) {
        intMinute-=5;
      }
      if (intMinute < 10) {
        setBreakTime({
          ...breakTime,
          breakMinutes: intMinute.toString()});
          if (mode === 'Break') {
            setMinutes(numMemo[intMinute]);
            setSeconds('00');
          }
      } else 
      setBreakTime({
        ...breakTime,
        breakMinutes: intMinute.toString()});
        if (mode === 'Break') {
          setMinutes(intMinute.toString());
          setSeconds('00');
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
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(numMemo[intMinute]);
            setSeconds('00');
          }
      } else {
        setSessionTime({
          ...sessionTime,
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(intMinute.toString());
            setSeconds('00');
          }
      }
      
    }
  }

  function incrementSessionMin5() {
    let intMinute = Number(sessionTime.sessionMinutes);
    if (start === false) {
      if (intMinute < 60) {
        intMinute+=5;
      }
      if (intMinute < 10) {
        setSessionTime({
          ...sessionTime,
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(numMemo[intMinute]);
            setSeconds('00');
          }
      } else {
        setSessionTime({
          ...sessionTime,
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(intMinute.toString());
            setSeconds('00');
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
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(numMemo[intMinute]);
            setSeconds('00');
          }
      } else {
        setSessionTime({
          ...sessionTime,
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(intMinute.toString());
            setSeconds('00');
          }
      }
      
    }
  }
  
  function decrementSessionMin5() {
    let intMinute = Number(sessionTime.sessionMinutes);
    if (start === false) {
      if (intMinute > 1) {
        intMinute-=5;
      }
      if (intMinute < 10) {
        setSessionTime({
          ...sessionTime,
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(numMemo[intMinute]);
            setSeconds('00');
          }
      } else {
        setSessionTime({
          ...sessionTime,
          sessionMinutes: intMinute.toString()});
          if (mode === 'Session') {
            setMinutes(intMinute.toString());
            setSeconds('00');
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

  useEffect(() => {
    if (start === true) {
      if ((seconds === '0' || seconds === '00') && minutes > 0) {
        const intervalMin = setInterval(() => {
          //setMinutes(decrementMinutes());
          setMinutes(minuteCallback);
          console.log({
            'Start Status:': start,
            //'Button Text:': buttonText,
            'Minutes:': minutes,
            'Seconds:': seconds,
            'Mode': mode
          });
        }, 1000);
        
        return () => clearInterval(intervalMin);
      } else {
        if (seconds > 0) {
          const intervalSec = setInterval(() => {
           // setSeconds(decrementSeconds());
           setSeconds(secondCallback);
            console.log({
              'Start Status:': start,
              //'Button Text:': buttonText,
              'Minutes:': minutes,
              'Seconds:': seconds,
              "Mode": mode
            });
          }, 1000);
          return () => clearInterval(intervalSec);
        }
      }
    }
  
    if (seconds === '00' && minutes === '00') {
      setStart(false);
      if (audio.currentTime === 0) {
        setTimeout(() => {
          audio.play();
    
        },);
       
        }
        
          if (mode === "Session") {
            //setMode('Break');
            setTimeout(() => {
              setMode('Break');
              setMinutes(breakTime.breakMinutes);
              setStart(true);
            }, 1000);
        }
        if (mode === 'Break') {
  
          setTimeout(() => {
            setMode('Session');
            setMinutes(sessionTime.sessionMinutes);
            setStart(true);
          }, 1000);
        } 
        audio.currentTime = 0;
        }
        
      
  
  }, [start, minutes, seconds, minuteCallback, secondCallback, mode, breakTime.breakMinutes, sessionTime.sessionMinutes, audio])
  
  //Functions that change time
 
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
                <button className='arrow arrow-left' id="break-increment" onClick={incrementBreakMin5}>+5</button>
                <button className='arrow arrow-left' id="break-increment" onClick={incrementBreakMin}>+1</button>
                <h3 id="break-length">{breakTime.breakMinutes}</h3>
                
                <button className='arrow arrow-right' id="break-decrement" onClick={decrementBreakMin}>-1</button>
                <button className='arrow arrow-right' id="break-decrement" onClick={decrementBreakMin5}>-5</button>
              </div>
          </div>
          <div id='sessionTime'>
            <h2 id="session-label">Session Time</h2>
            <div className="timer">
            <button className='arrow arrow-left' id="session-increment" onClick={incrementSessionMin5}>+5</button>
            <button className='arrow arrow-left' id="session-increment" onClick={incrementSessionMin}>+1</button>
                <h3 id="session-length">{sessionTime.sessionMinutes}</h3>
                <button className='arrow arrow-right' id="session-decrement" onClick={decrementSessionMin}>-1</button>
                <button className='arrow arrow-right' id="session-decrement" onClick={decrementSessionMin5}>-5</button>
              </div>
          </div>
        </div>
      </div>
    );
  }
export default App;
