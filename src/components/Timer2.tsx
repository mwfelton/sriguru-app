import React, { useState, useRef, useEffect } from 'react';
import { IoPlayOutline } from "react-icons/io5";
import { CiPause1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

// interface TimerProps {
//   duration: number;
//   setActiveCountdown: React.Dispatch<React.SetStateAction<number>>
// }

const Timer2 = () => {

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);
  const [timerLimitInMinutes, setTimerLimitInMinutes] = useState(25);

  const intervalId = useRef<number | null>(null);

  // setActiveCountdown(timeElapsedInSeconds)

  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const clearTimerInterval = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const onResetTimer = () => {
    clearTimerInterval();
    setIsTimerRunning(false);
    setTimeElapsedInSeconds(0);
    setTimerLimitInMinutes(25);
    // setResetActiveCountdown(true);
  };

  const incrementTimeElapsedInSeconds = () => {
    setTimeElapsedInSeconds(prevTimeElapsedInSeconds => {
      const isTimerCompleted = prevTimeElapsedInSeconds === timerLimitInMinutes * 60;

      if (isTimerCompleted) {
        clearTimerInterval();
        setIsTimerRunning(false);
        return prevTimeElapsedInSeconds;
      } else {
        return prevTimeElapsedInSeconds + 1;
      }
    });
  };

  const onStartOrPauseTimer = () => {
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;

    if (isTimerCompleted) {
      setTimeElapsedInSeconds(0);
    }
    if (isTimerRunning) {
      clearTimerInterval();
    } else {
      intervalId.current = window.setInterval(incrementTimeElapsedInSeconds, 1000);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const getElapsedSecondsInTimeFormat = () => {
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeElapsedInSeconds;
    const minutes = Math.floor(totalRemainingSeconds / 60);
    const seconds = Math.floor(totalRemainingSeconds % 60);
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  const renderTimerController = () => {
        const startOrPauseIcon = isTimerRunning ? <CiPause1 size={20}/> : <IoPlayOutline size={25}/>;
        const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon';
        return (
          <div className="flex items-center">
            <button
              className="flex justify-center items-center h-12"
              onClick={onStartOrPauseTimer}
              type="button"
              >
              <span className="mr-2" aria-label={startOrPauseAltText}>
                {startOrPauseIcon}
              </span>
    
              <p className="text-5">{isTimerRunning ? 'Pause' : 'Start'}</p>
            </button>
    
            <button
              className="flex items-center ml-5"
              onClick={onResetTimer}
              type="button"
            >
              <span className="mr-2">
                <GrPowerReset size={20}/>
              </span>
             
              <p className="text-5">Reset</p>
            </button>
          </div>
        );
      };

  // const renderTimerController = () => {
  //   return (
  //     <div className="flex items-center">
  //       <button
  //         className="flex justify-center items-center h-12"
  //         onClick={onStartOrPauseTimer}
  //         type="button"
  //         >
  //         <span className="mr-2" aria-label='pause icon'>
  //         <CiPause1 size={20}/>
  //         </span>

  //         <p className="text-5">Pause</p>
  //       </button>

  //       <button
  //         className="flex items-center ml-5"
  //         onClick={onResetTimer}
  //         type="button"
  //       >
  //         <span className="mr-2">
  //           <GrPowerReset size={20}/>
  //         </span>
         
  //         <p className="text-5">Reset</p>
  //       </button>
  //     </div>
  //   );
  // };

  return (
    <>
    <div className="w-full flex bg-seashell rounded px-2">
      {renderTimerController()}
      <div className="flex w-full justify-end items-center text-2xl font-mono">{getElapsedSecondsInTimeFormat()}</div>
    </div>
    </>
  );
};

export default Timer2;


// import React, { useState, useRef, useEffect } from 'react';
// import { IoPlayOutline } from "react-icons/io5";
// import { CiPause1 } from "react-icons/ci";
// import { GrPowerReset } from "react-icons/gr";

// interface TimerProps {
//   duration: number;
//   setActiveCountdown: React.Dispatch<React.SetStateAction<number>>
// }

// const Timer2 = () => {

//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);
//   const [timerLimitInMinutes, setTimerLimitInMinutes] = useState(25);

//   const intervalId = useRef<number | null>(null);
//   setActiveCountdown(timeElapsedInSeconds)
//   useEffect(() => {
//     return () => {
//       if (intervalId.current !== null) {
//         clearInterval(intervalId.current);
//       }
//     };
//   }, []);

//   const clearTimerInterval = () => {
//     if (intervalId.current !== null) {
//       clearInterval(intervalId.current);
//       intervalId.current = null;
//     }
//   };

//   const onResetTimer = () => {
//     clearTimerInterval();
//     setIsTimerRunning(false);
//     setTimeElapsedInSeconds(0);
//     setTimerLimitInMinutes(duration);
//     setResetActiveCountdown(true);
//   };

//   const incrementTimeElapsedInSeconds = () => {
//     setTimeElapsedInSeconds(prevTimeElapsedInSeconds => {
//       const isTimerCompleted = prevTimeElapsedInSeconds === timerLimitInMinutes * 60;

//       if (isTimerCompleted) {
//         clearTimerInterval();
//         setIsTimerRunning(false);
//         return prevTimeElapsedInSeconds;
//       } else {
//         return prevTimeElapsedInSeconds + 1;
//       }
//     });
//   };

//   const onStartOrPauseTimer = () => {
//     const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;

//     if (isTimerCompleted) {
//       setTimeElapsedInSeconds(0);
//     }
//     if (isTimerRunning) {
//       clearTimerInterval();
//     } else {
//       intervalId.current = window.setInterval(incrementTimeElapsedInSeconds, 1000);
//     }
//     setIsTimerRunning(!isTimerRunning);
//   };

//   const getElapsedSecondsInTimeFormat = () => {
//     const totalRemainingSeconds = timerLimitInMinutes * 60 - timeElapsedInSeconds;
//     const minutes = Math.floor(totalRemainingSeconds / 60);
//     const seconds = Math.floor(totalRemainingSeconds % 60);
//     const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
//     const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;

//     return `${stringifiedMinutes}:${stringifiedSeconds}`;
//   };

//   const renderTimerController = () => {
//     const startOrPauseIcon = isTimerRunning ? <CiPause1 size={20}/> : <IoPlayOutline size={25}/>;
//     const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon';
//     return (
//       <div className="flex items-center">
//         <button
//           className="flex justify-center items-center h-12"
//           onClick={onStartOrPauseTimer}
//           type="button"
//           >
//           <span className="mr-2" aria-label={startOrPauseAltText}>
//             {startOrPauseIcon}
//           </span>

//           <p className="text-5">{isTimerRunning ? 'Pause' : 'Start'}</p>
//         </button>

//         <button
//           className="flex items-center ml-5"
//           onClick={onResetTimer}
//           type="button"
//         >
//           <span className="mr-2">
//             <GrPowerReset size={20}/>
//           </span>
         
//           <p className="text-5">Reset</p>
//         </button>
//       </div>
//     );
//   };

//   return (
//     <>
//     <div className="w-full flex ">
//       {renderTimerController()}
//       <div className="flex w-full justify-end items-center text-2xl font-mono">{getElapsedSecondsInTimeFormat()}</div>
//       {/* <p className="text-lg">{isTimerRunning ? 'Running' : 'Paused'}</p> */}
//     </div>
//     </>
//   );
// };

// export default Timer2;
