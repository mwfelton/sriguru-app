import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Timer = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);
  const [timerLimitInMinutes, setTimerLimitInMinutes] = useState(25);

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

  const onDecreaseTimerLimitInMinutes = () => {
    if (timerLimitInMinutes > 1) {
      setTimerLimitInMinutes(timerLimitInMinutes - 1);
    }
  };

  const onIncreaseTimerLimitInMinutes = () => setTimerLimitInMinutes(timerLimitInMinutes + 1);

  const onResetTimer = () => {
    clearTimerInterval();
    setIsTimerRunning(false);
    setTimeElapsedInSeconds(0);
    setTimerLimitInMinutes(25);
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

  const renderTimerLimitController = () => {
    const isButtonsDisabled = timeElapsedInSeconds > 0;

    return (
      <div className="flex items-center justify-center mt-4">
        <p className="text-lg mr-4">Set Timer limit</p>
        <div className="flex items-center">
          <button
            className="bg-gray-300 text-lg px-2 py-1 rounded disabled:opacity-50"
            disabled={isButtonsDisabled}
            onClick={onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="mx-4 text-xl">{timerLimitInMinutes}</div>
          <button
            className="bg-gray-300 text-lg px-2 py-1 rounded disabled:opacity-50"
            disabled={isButtonsDisabled}
            onClick={onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const renderTimerController = () => {
    const startOrPauseImageUrl = isTimerRunning
      ? '/pause-icon-img.png'
      : '/play-icon-img.png';
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon';

    return (
      <div className="flex items-center justify-center mt-4">
        <button
          className="flex items-center bg-gray-300 px-4 py-2 rounded mr-4"
          onClick={onStartOrPauseTimer}
          type="button"
        >
          <Image
            alt={startOrPauseAltText}
            className="mr-2"
            src={startOrPauseImageUrl}
            width={20}
            height={20}
          />
          <p className="text-lg">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          className="flex items-center bg-gray-300 px-4 py-2 rounded"
          onClick={onResetTimer}
          type="button"
        >
          <Image
            alt="reset icon"
            className="mr-2"
            src="/reset-icon-img.png"
            width={20}
            height={20}
          />
          <p className="text-lg">Reset</p>
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Digital Timer</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <div className="text-4xl font-mono">{getElapsedSecondsInTimeFormat()}</div>
          <p className="text-lg mt-2">{isTimerRunning ? 'Running' : 'Paused'}</p>
        </div>
        {renderTimerController()}
        {renderTimerLimitController()}
      </div>
    </div>
  );
};

export default Timer;
