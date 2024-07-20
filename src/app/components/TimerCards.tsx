import React from 'react';
import Image from "next/image";
import CardImage from '../../../public/images/Untitled design.png';
import ProgressBar from '../components/ProgressBar';
import data from '../kriya.json';

interface TimerCardsProps {
  currentCardIndex: number;
}

const TimerCards = ({ currentCardIndex }: TimerCardsProps) => {
  const card = data[currentCardIndex];

  return (
    <>
      <div key={currentCardIndex} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
        <Image
          src={CardImage}
          alt='hero image for kriya practice page'
          width={500} height={300}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{card.name}</div>
          <div className="font-bold text-xl mb-2">Progress Bar</div>
          <ProgressBar minutes={card.minutes} seconds={card.seconds} />
        </div>
      </div>

      <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
        <button className='px-4 py-2 m-2 text-seashell text-center'>
          Pause Kriya
        </button>
      </div>
      <div className='flex w-full flex-col items-center bg-crystal_blue rounded my-4'>
        <button className='px-4 py-2 m-2 text-seashell text-center'>
          Finish Kriya
        </button>
      </div>
    </>
  );
}

export default TimerCards;
