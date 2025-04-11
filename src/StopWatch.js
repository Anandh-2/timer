import React, { useEffect, useState } from "react";
import { formatTime } from "./TimeFunc";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";

function StopWatch() {
  const [stopWatch, setStopWatch] = useState(0);

  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  const [stopWatchId, setStopWatchId] = useState(null);

  function startStopWatch() {
    const id = setInterval(() => {
      setStopWatch((prev) => prev + 1);
    }, 1000);
    setStopWatchId(id);
  }

  function pauseStopWatch() {
    clearInterval(stopWatchId);
    setStopWatchId(null);
  }

  function stopStopWatch() {
    clearTimeout(stopWatchId);
    setStopWatch(0);
    setStopWatchId(null);
  }

  useEffect(() => {
    const currTime = formatTime(stopWatch);
    setHour(currTime.hr);
    setMinute(currTime.min);
    setSecond(currTime.sec);
  }, [stopWatch]);
  return (
    <div className="stopwatch">
        <div className="stopwatch-time">
          <div className="time-box">{hour}</div>
          <div>:</div>
          <div className="time-box">{minute}</div>
          <div>:</div>
          <div className="time-box">{second}</div>
        </div>
        <div className="sw-btns"> 
        {stopWatchId ?<button onClick={pauseStopWatch}>
          <FaRegPauseCircle />
        </button> : <button onClick={startStopWatch}>
          <FaRegPlayCircle />
        </button>
        }
        <button onClick={stopStopWatch}>
          <FaRegStopCircle />
        </button>
        </div>
    </div>
  );
}

export default StopWatch;
