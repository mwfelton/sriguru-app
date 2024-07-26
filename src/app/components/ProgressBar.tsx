import React from 'react';

interface ProgressBarProps {
  totalDuration: number; // Total duration of the timer in seconds
  elapsedTime: number;   // Time elapsed in seconds
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalDuration, elapsedTime }) => {
  const percentage = (elapsedTime / totalDuration) * 100;

  return (
    <div className='my-5'>
      <div className='bg-crystal_blue/20 h-4 rounded-full overflow-hidden'>
        <div
          className='bg-crystal_blue h-full transition-all ease-linear'
          style={{ 
            width: `${percentage}%`, 
            transitionDuration: '1000ms' // Smooth transition every second
          }}
        >
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
