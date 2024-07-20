import React from 'react';

interface ProgressBarProps {
  totalDuration: number; // Total duration of the timer in seconds
  elapsedTime: number;   // Time elapsed in seconds
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalDuration, elapsedTime }) => {
  const percentage = (elapsedTime / totalDuration) * 100;

  return (
    <div className='my-20'>
      <div className='bg-crystal_blue/20 h-4 rounded-full overflow-hidden'>
        <div
          className='bg-crystal_blue h-full'
          style={{ width: `${percentage}%` }}
        >
          {/* Remove text content to hide numbers */}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
