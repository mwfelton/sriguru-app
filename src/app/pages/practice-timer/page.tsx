"use client"
import React, { useState, useEffect } from 'react';
import Timer from "../../components/Timer";
import Accordion from "../../components/Accordion";
import Bar from "../../components/Bar";
import TimerCards from "../../components/TimerCards";
import Image from "next/image";
import KriyaTimerHero from '../../../../public/images/kriya-timer-hero.png';
import data from '../../kriya.json';

export default function PracticeTimer() {
  const [activeCountdown, setActiveCountdown] = useState(0);
  const [resetActiveCountdown, setResetActiveCountdown] = useState(false);
  const [startKriya, setStartKriya] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleStartKriya = () => {
    setStartKriya(!startKriya); // Toggle startKriya state
  };

  useEffect(() => {
    if (activeCountdown >= 0) {
      const totalDuration = data.reduce((acc, card) => acc + card.seconds, 0);
      if (activeCountdown >= totalDuration) {
        setCurrentCardIndex((prevIndex) => {
          if (prevIndex < data.length - 1) {
            return prevIndex + 1;
          } else {
            // Reset or finish the process
            setStartKriya(false);
            return 0;
          }
        });
      }
    }
  }, [activeCountdown]);

  return (
    <main className="flex min-h-screen flex-col items-center px-12 py-5">
      {!startKriya && (
        <>
          <div className='shadow-md shadow-gray-600 rounded-lg overflow-hidden'>
            <Image
              src={KriyaTimerHero}
              alt='hero image for kriya practice page' />
          </div>
          <div className='flex flex-col items-center bg-seashell mt-1 py-5 px-2 rounded'>
            <h1 className='text-lg text-crystal_blue'>Kriya Practice Guide</h1>
            <p className="text-justify my-2 px-2">Use this guide to help you keep the correct timing for your Kriya. The timer is customisable for certain parts of the Kriya but the most important parts are set to help you keep on track.</p>
          </div>
        </>
      )}

      {/* Start Button */}
      {!startKriya && (
        <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
          <button 
            className='px-4 py-2 m-2 text-seashell text-center'
            onClick={handleStartKriya}
          >
            Start your Kriya egg
          </button>
        </div>
      )}

      {/* Manage Button */}
      {!startKriya && (
        <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
          <button 
            className='px-4 py-2 m-2 text-seashell text-center'
            onClick={handleStartKriya}
          >
           Manage your Kriya
          </button>
        </div>
      )}

      
      {/* TimerCards */}
      {startKriya && (
        <TimerCards currentCardIndex={currentCardIndex} />
      )}
    </main>
  );
}


// {/* Accordion and Timer */}
// {startKriya && (
//   <Accordion 
//     buttonTitle="Full Kriya Practice"
//     firstDropDown={<Timer 
//       duration={data[currentCardIndex].seconds}
//       setActiveCountdown={setActiveCountdown}
//       setResetActiveCountdown={setResetActiveCountdown}
//     />}
//     secondDropDown={
//       <Bar 
//         activeCountdown={activeCountdown}
//         resetActiveCountdown={resetActiveCountdown}
//       />
//     }
//   />
// )}
