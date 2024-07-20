import React from 'react';

interface ProgressBarProps {
  minutes: string;
  seconds: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ minutes, seconds }) => {
  const totalSeconds = parseInt(minutes.split(":")[0]) * 60 + parseInt(minutes.split(":")[1]);
  const percentage = (seconds / totalSeconds) * 100;

  return (
    <div className='my-20'>
      <h1 className='text-2xl md:text-5xl uppercase text-crystal_blue font-extrabold animate-pulse mt-20 my-10'>
        Progress bar in Tailwind CSS
      </h1>

      <div>
        <div className='bg-crystal_blue/20 h-4 rounded-full overflow-hidden'>
          <div
            className='bg-crystal_blue flex justify-center items-center h-full text-xs text-white font-bold'
            style={{ width: `${percentage}%` }}
          >
            {percentage.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
