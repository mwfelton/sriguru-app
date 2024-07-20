import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CardImage from '../../../public/images/Untitled design.png';
import ProgressBar from '../components/ProgressBar';
import data from '../kriya.json';

interface TimerCardsProps {
  activeCountdown: number;
  resetActiveCountdown: () => void;
}

const TimerCards: React.FC<TimerCardsProps> = ({ activeCountdown, resetActiveCountdown }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Calculate the total duration of the current card
    if (data[currentIndex]) {
      if (activeCountdown >= data[currentIndex].seconds) {
        if (currentIndex < data.length - 1) {
          setCurrentIndex(currentIndex + 1);
          resetActiveCountdown();
        }
      }
    }
  }, [activeCountdown, currentIndex, resetActiveCountdown]);

  return (
    <>
      {data[currentIndex] && (
        <div key={currentIndex} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
          <Image
            src={CardImage}
            alt='hero image for kriya practice page'
            width={500} height={300} // You can adjust width and height as needed
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data[currentIndex].name}</div>
            <ProgressBar
              totalDuration={data[currentIndex].seconds}
              elapsedTime={activeCountdown}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TimerCards;
