"use client"
import React, { useState } from 'react';
import Timer from "../../components/Timer";
// import Timer2 from "../../components/Timer2";
import Accordion from "../../components/Accordion";
// import Accordion2 from "../../components/Accordion2";

import Bar from "../../components/Bar";
import Image from "next/image";
import KriyaTimerHero from '../../../../public/images/kriya-timer-hero.png';

export default function PracticeTimer() {
  const [activeCountdown, setActiveCountdown] = useState(0);
  const [resetActiveCountdown, setResetActiveCountdown] = useState(false);
  const [startKriya, setStartKriya] = useState(false);

  const handleStartKriya = () => {
    setStartKriya(!startKriya); // Toggle startKriya state
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-12 py-5">
      <div className='shadow-md shadow-gray-600 rounded-lg overflow-hidden'>
        <Image
          src={KriyaTimerHero}
          alt='hero image for kriya practice page'
        />
      </div>

      {!startKriya && (
        <div className='flex flex-col items-center bg-seashell mt-1 py-5 px-2 rounded'>
          <h1 className='text-lg text-crystal_blue'>Kriya Practice Guide</h1>
          <p className="text-justify my-2 px-2">Use this guide to help you keep the correct timing for your Kriya. The timer is customisable for certain parts of the Kriya but the most important parts are set to help you keep on track.</p>
        </div>
      )}

      <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
        <button 
          className='px-4 py-2 m-2 text-seashell text-center'
          onClick={handleStartKriya}
        >
          {startKriya ? 'End Kriya' : 'Start your Kriya'}
        </button>
      </div>

      {/* DUMMMY
      <div className='flex flex-col w-full overflow-hidden flex items-center bg-cherry_blossom rounded mb-20'>
      <Timer 
            duration={58}
            setActiveCountdown={setActiveCountdown}
            setResetActiveCountdown={setResetActiveCountdown}
          />
        <Bar 
              activeCountdown={activeCountdown}
              resetActiveCountdown={resetActiveCountdown}
            />
      </div> */}

      {/* <Bar 
              activeCountdown={activeCountdown}
              resetActiveCountdown={resetActiveCountdown}
            /> */}

      {startKriya && (
        <Accordion 
          buttonTitle="Full Kriya Practice"
          firstDropDown={<Timer 
            duration={58}
            setActiveCountdown={setActiveCountdown}
            setResetActiveCountdown={setResetActiveCountdown}
          />}
          secondDropDown={
            <Bar 
              activeCountdown={activeCountdown}
              resetActiveCountdown={resetActiveCountdown}
            />
          }
        />
      )}

{/* {startKriya && (
        <Accordion2 
          buttonTitle="egger"
          firstDropDown={<Timer2 
            duration={58}
            setActiveCountdown={setActiveCountdown}
            setResetActiveCountdown={setResetActiveCountdown}
          />}
          secondDropDown={
            <Bar 
              activeCountdown={activeCountdown}
              resetActiveCountdown={resetActiveCountdown}
            />
          }
        />
      )} */}
    </main>
  );
}


// "use client"
// import React from 'react'
// import { useState, useEffect, useRef } from "react";
// import Timer from "../../components/Timer"
// import Accordion from "../../components/Accordion"
// import Bar from "../../components/Bar";
// import Image from "next/image";
// import KriyaTimerHero from '../../../../public/images/kriya-timer-hero.png'

// export default function PracticeTimer() {
//   const [activeCountdown, setActiveCountdown] = useState(0);
//   const [resetActiveCountdown, setResetActiveCountdown] = useState(false);

//   return (
//     <main className="flex min-h-screen flex-col items-center px-12 py-5">
//       <div className='shadow-md shadow-gray-600 rounded-lg overflow-hidden'>
//         <Image
//           src={KriyaTimerHero}
//           alt='hero image for kriya practice page'
//         />

//         <div className='flex flex-col items-center bg-seashell mt-1 py-5 px-2'>
//           <h1 className='text-lg text-crystal_blue'>Kriya Practice Guide</h1>
//           <p className="text-justify my-2 px-2">Use this guide to help you keep the correct timing for your Kriya. The timer is customisable for certain parts of the Kriya but the most important parts are set to help you keep on track.</p>
//         </div>
//       </div>

//       <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
//         <button className='px-4 py-2 m-2 text-seashell text-center'>
//           Start your Kriya
//         </button>
//       </div>

//       <Accordion 
//         buttonTitle="Full Kriya Practice"
//         firstDropDown={<Timer 
//           duration={58}
//           setActiveCountdown={setActiveCountdown}
//           setResetActiveCountdown={setResetActiveCountdown}
//         />}
//         secondDropDown={
//           <Bar 
//             activeCountdown={activeCountdown}
//             resetActiveCountdown={resetActiveCountdown}
//           />}
//       />
//     </main>
//   );
// }

// {/* <button className="w-1/2 bg-opal text-white py-4 px-4 border-b-4 border-crystal_blue hover:border-seashell rounded">
// Full Kriya
// </button> */}