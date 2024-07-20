"use client";
import React, { useState, useEffect } from 'react';
import TimerCards from "../../components/TimerCards";
import Image from "next/image";
import KriyaTimerHero from '../../../../public/images/kriya-timer-hero.png';

export default function PracticeTimer() {
  const [activeCountdown, setActiveCountdown] = useState(0);
  const [resetActiveCountdown, setResetActiveCountdown] = useState(false);
  const [startKriya, setStartKriya] = useState(false);

  const handleStartKriya = () => {
    setStartKriya(!startKriya); // Toggle startKriya state
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (startKriya) {
      intervalId = setInterval(() => {
        setActiveCountdown(prev => prev + 1);
      }, 1000);

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [startKriya]);

  useEffect(() => {
    if (resetActiveCountdown) {
      setActiveCountdown(0);
      setResetActiveCountdown(false);
    }
  }, [resetActiveCountdown]);

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

      {!startKriya && (
        <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
          <button 
            className='px-4 py-2 m-2 text-seashell text-center'
            onClick={handleStartKriya}
          >
            Start your Kriya
          </button>
        </div>
      )}

      {startKriya && (
        <TimerCards
          activeCountdown={activeCountdown}
          resetActiveCountdown={resetActiveCountdown}
        />
      )}
    </main>
  );
}
