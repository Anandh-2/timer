import React, { useEffect, useRef, useState } from "react";
import { formatTime, formatNum } from "./TimeFunc";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimerEnded, setIsTimerEnded] = useState(false);

  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");


  function startTimer() {
    if(!isTimerStarted){
      let total=Number(hour)*3600+Number(minute)*60+Number(second);
      setTimer(total);
    }
    const id = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    setTimerId(id);
    setIsTimerStarted(true);
    setIsTimerEnded(false);
  }

  function stopTimer() {
    clearInterval(timerId);
    setTimer(0);
    setTimerId(null);
    setIsTimerStarted(false);
    setIsTimerEnded(true);
  }

  function pauseTimer() {
    clearInterval(timerId);
    setTimerId(null);
  }

  useEffect(() => {
    if (isTimerStarted && timer <= 0) {
      setIsTimerEnded(true);
      stopTimer();
    }
    const currTime = formatTime(timer);
    setHour(currTime.hr);
    setMinute(currTime.min);
    setSecond(currTime.sec);
  }, [timer]);

  function handleInput(e) {
    let value = e.target.innerHTML;
    /*e.target.innerHTML=value.substring(1);
    placeCaretAtEnd(e.target);*/
    if(value.length===0){
      e.target.innerHTML='00';
      return;
    }
    if(e.target.id==='hr'){
      if(isNaN(Number(value.charAt(value.length-1)))){
        e.target.innerHTML=value.substring(0,2);
        placeCaretAtEnd(e.target);
        return;
      }
      if(Number(value.substring(1))>24){
        e.target.innerHTML=value.substring(0,2);
        placeCaretAtEnd(e.target);
        return;
      }
      value=value.substring(1);
      setHour(value);
      e.target.innerHTML=value;
    }else{
      if(isNaN(Number(value.charAt(value.length-1)))){
        e.target.innerHTML=value.substring(0,2);
        placeCaretAtEnd(e.target);
        return;
      }
      if(Number(value.substring(1))>59){
        e.target.innerHTML=value.substring(0,2);
        placeCaretAtEnd(e.target);
        return;
      }
      value=value.substring(1);
      if(e.target.id==='min'){
        setMinute(value);
      }else{
        setSecond(value);
      }
      e.target.innerHTML=value;
    }
    placeCaretAtEnd(e.target);
  }

  function placeCaretAtEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  const inputRef = [useRef(null), useRef(null), useRef(null)];

  return (
    <div className="timer">
    {!isTimerStarted?
      <div className="timer-time">
        <div ref={inputRef[0]} id="hr" contentEditable="true" onInput={handleInput}>
          00
        </div>
        <div>:</div>
        <div ref={inputRef[1]} id="min" contentEditable="true" onInput={handleInput}>
          00
        </div>
        <div>:</div>
        <div ref={inputRef[2]} id="sec" contentEditable="true" onInput={handleInput}>
          00
        </div>
      </div>:
      <div className="timer-time">
        <div>{hour}</div>
        <div>:</div>
        <div>{minute}</div>
        <div>:</div>
        <div>{second}</div>
      </div>}
      <div className="sw-btns">
        {timerId ? (
          <button onClick={pauseTimer}>
            <FaRegPauseCircle />
          </button>
        ) : (
          <button onClick={startTimer}>
            <FaRegPlayCircle />
          </button>
        )}
        <button onClick={stopTimer}>
          <FaRegStopCircle />
        </button>
      </div>
      {isTimerEnded && <div>Times up</div>}
    </div>
  );
}

export default Timer;
