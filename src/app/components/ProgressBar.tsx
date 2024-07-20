import React from 'react';

interface ProgressBarProps {
  totalDuration: number; // Total duration of the timer in seconds
  elapsedTime: number;   // Time elapsed in seconds
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalDuration, elapsedTime }) => {
  const percentage = (elapsedTime / totalDuration) * 100;

  return (
    <div className='my-20'>
      <h1 className='text-2xl md:text-5xl uppercase text-crystal_blue font-extrabold animate-pulse mt-20 my-10'>
        Progress bar
      </h1>
      <div>
        <div className='bg-crystal_blue/20 h-4 rounded-full overflow-hidden'>
          <div
            className='bg-crystal_blue h-full text-xs text-white font-bold'
            style={{ width: `${percentage}%` }}
          >
            {/* Remove text content to hide numbers */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
