"use client"
import React from 'react'
import { useState, useEffect, useRef } from "react";
import Timer from "../../components/Timer"
import Accordion from "../../components/Accordion"
import Bar from "../../components/Bar";

export default function PracticeTimer() {
  const [activeCountdown, setActiveCountdown] = useState(0);
  const [resetActiveCountdown, setResetActiveCountdown] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center px-12 py-5">
      <div className="w-full md:w-1/2 pb-8">
       <h1 className='text-left text-base'>Kriya EGG Timer</h1>
      </div>

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
          />}
      />
    </main>
  );
}

{/* <button className="w-1/2 bg-opal text-white py-4 px-4 border-b-4 border-crystal_blue hover:border-seashell rounded">
Full Kriya
</button> */}