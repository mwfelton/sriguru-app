"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import TimerCards from "../../components/TimerCards";
import Image from "next/image";
import KriyaTimerHero from '../../../public/images/kriya-timer-hero.png';

export default function PracticeTimer() {
  const [activeCountdown, setActiveCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleStartPauseKriya = () => {
    setIsRunning(prev => !prev);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setActiveCountdown(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const resetActiveCountdown = () => {
    setActiveCountdown(0);
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-12 py-5">
      {!isRunning && activeCountdown === 0 && (
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

      {isRunning || activeCountdown > 0 ? (
        <TimerCards
          activeCountdown={activeCountdown}
          resetActiveCountdown={resetActiveCountdown}
        />
      ) : null}

      <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
        <button 
          className='px-4 py-2 m-2 text-seashell text-center'
          onClick={handleStartPauseKriya}
        >
          {isRunning ? "Pause Kriya" : "Start your Kriya"}
        </button>
      </div>

      <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
        <Link href="/manage-kriya">
          <button 
            className='px-4 py-2 m-2 text-seashell text-center'
          >
            Manage your Kriya
          </button>
        </Link>
      </div>
    </main>
  );
}

