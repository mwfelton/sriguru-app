import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProgressBar from '../components/ProgressBar';
import data from '../kriya.json';

const TimerCards: React.FC<{ activeCountdown: number; resetActiveCountdown: () => void }> = ({ activeCountdown, resetActiveCountdown }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const totalSeconds = data[currentIndex].seconds;
    if (activeCountdown >= totalSeconds + 1) { // Adding 1 extra second
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
        resetActiveCountdown();
      }
    }
  }, [activeCountdown, currentIndex, resetActiveCountdown]);

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
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data[currentIndex].name}</div>
            <h1>{currentIndex}</h1>
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
