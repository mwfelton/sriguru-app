import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProgressBar from '../components/ProgressBar';
import data from '../kriya.json';
import useSound from 'use-sound';

const TimerCards: React.FC<{ activeCountdown: number; resetActiveCountdown: () => void }> = ({ activeCountdown, resetActiveCountdown }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [play, { stop }] = useSound(
    '/temple-bell.mp3',
    { volume: 0.5 }
  );

  useEffect(() => {
    const totalSeconds = data[currentIndex].seconds;
    if (activeCountdown >= totalSeconds + 1) { // Adding 1 extra second
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
        play();
        resetActiveCountdown();
      }
    }
  }, [activeCountdown, currentIndex, resetActiveCountdown]);

  const getElapsedSecondsInTimeFormat = (totalSeconds, elapsedSeconds) => {
    const totalRemainingSeconds = totalSeconds - elapsedSeconds;
    const minutes = Math.floor(totalRemainingSeconds / 60);
    const seconds = totalRemainingSeconds % 60;
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  return (
    <>
      {data[currentIndex] && (
        <div key={currentIndex} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
          <Image
            src={data[currentIndex].image}
            alt={`hero image for ${data[currentIndex].name}`}
            width={500}
            height={300} // Adjust width and height as needed
          />
          <div className="px-4 py-2">
            <div className="flex justify-between font-bold text-lg mb-1">
              {data[currentIndex].name}
              <h1>{getElapsedSecondsInTimeFormat(data[currentIndex].seconds, activeCountdown)}</h1> 
            </div>
            <ProgressBar
              totalDuration={data[currentIndex].seconds}
              elapsedTime={activeCountdown}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TimerCards;
