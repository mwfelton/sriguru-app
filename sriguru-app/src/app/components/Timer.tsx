import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoPlayOutline } from "react-icons/io5";
import { CiPause1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

interface TimerProps {
  duration: number;
}

const Timer = ({ duration }: TimerProps) => {
  console.log(duration)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);
  const [timerLimitInMinutes, setTimerLimitInMinutes] = useState(duration);

  console.log('', timerLimitInMinutes)
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const clearTimerInterval = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const onResetTimer = () => {
    clearTimerInterval();
    setIsTimerRunning(false);
    setTimeElapsedInSeconds(0);
    setTimerLimitInMinutes(duration);
  };

  const incrementTimeElapsedInSeconds = () => {
    setTimeElapsedInSeconds(prevTimeElapsedInSeconds => {
      const isTimerCompleted = prevTimeElapsedInSeconds === timerLimitInMinutes * 60;

      if (isTimerCompleted) {
        clearTimerInterval();
        setIsTimerRunning(false);
        return prevTimeElapsedInSeconds;
      } else {
        return prevTimeElapsedInSeconds + 1;
      }
    });
  };

  const onStartOrPauseTimer = () => {
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;

    if (isTimerCompleted) {
      setTimeElapsedInSeconds(0);
    }
    if (isTimerRunning) {
      clearTimerInterval();
    } else {
      intervalId.current = window.setInterval(incrementTimeElapsedInSeconds, 1000);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const getElapsedSecondsInTimeFormat = () => {
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeElapsedInSeconds;
    const minutes = Math.floor(totalRemainingSeconds / 60);
    const seconds = Math.floor(totalRemainingSeconds % 60);
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  const renderTimerController = () => {
    const startOrPauseIcon = isTimerRunning ? <CiPause1 size={50}/> : <IoPlayOutline size={50}/>;
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon';
    return (
      <div className="flex items-center">
        <button
          className="flex items-center px-4 py-3 "
          onClick={onStartOrPauseTimer}
          type="button"
        >
          <span className="mr-2" aria-label={startOrPauseAltText}>
            {startOrPauseIcon}
          </span>

          <p className="text-lg">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          className="flex items-center px-4 py-3"
          onClick={onResetTimer}
          type="button"
        >
          <span className="mr-2">
            <GrPowerReset size={40}/>
          </span>
         
          <p className="text-lg">Reset</p>
        </button>
      </div>
    );
  };

  return (
    <div className="flex ">
      {renderTimerController()}
      <div className="flex w-full justify-end items-center text-4xl font-mono px-6">{getElapsedSecondsInTimeFormat()}</div>
      {/* <p className="text-lg">{isTimerRunning ? 'Running' : 'Paused'}</p> */}
      
    </div>
  );
};

export default Timer;
