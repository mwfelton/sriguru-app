import React from "react";
import { PiFlowerLotusLight } from "react-icons/pi";
import { useState, useEffect } from "react";

const initialElements = [
  { name: "Sri Guru Mantra", seconds: 300, minutes: "5:00", customisable: false},
  { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
  { name: "Vishuddhi & Nabi Kriya", seconds: 120, minutes: "2:00", customisable: true },
  { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
  { name: "Maha Mudra", seconds: 360, minutes: "6:00", customisable: true },
  { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
  { name: "Central Kriya Pranayam", seconds: 600, minutes: "10:00", customisable: false },
  { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
  { name: "Bumble Bee", seconds: 240, minutes: "4:00", customisable: true },
  { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
  { name: "Chakra Dharana", seconds: 180, minutes: "3:00", customisable: true },
  { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
  { name: "Bhastrika Kriya", seconds: 180, minutes: "3:00", customisable: true },
  { name: "Sit Quietly", seconds: 300, minutes: "5:00", customisable: true },
];

let cumulativeTime = 0;
const elementsWithCumulativeTime = initialElements.map((element) => {
  cumulativeTime += element.seconds;
  return { ...element, cumulativeTime };
});

interface BarProps {
  activeCountdown: number;
  resetActiveCountdown: boolean;
}

const Bar = ({ activeCountdown, resetActiveCountdown }: BarProps) => {

  const [elements, setElements] = useState(initialElements);

  // Function to convert seconds to "MM:SS" format
  const convertSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Function to handle increment and decrement
  const handleTimeChange = (index, increment) => {
    setElements(prevElements => {
      return prevElements.map((element, i) => {
        if (i === index && element.customisable) {
          const newSeconds = element.seconds + (increment ? 30 : -30);
          return {
            ...element,
            seconds: newSeconds > 0 ? newSeconds : 0,
            minutes: convertSecondsToMinutes(newSeconds > 0 ? newSeconds : 0),
          };
        }
        return element;
      });
    });
  };

  const getActiveElementIndex = () => {
    const adjustedCountdown = activeCountdown - 1; // Account for 1-second delay
    if (adjustedCountdown < 0) return -1; // If activeCountdown is less than 1 second, no element should be active

    for (let i = 0; i < elementsWithCumulativeTime.length; i++) {
      if (adjustedCountdown < elementsWithCumulativeTime[i].cumulativeTime) {
        return i;
      }
    }
    return elementsWithCumulativeTime.length - 1;
  };

  const activeElementIndex = getActiveElementIndex();

  console.log("piss lips", activeCountdown);

  const [currentActive, setCurrentActive] = useState(1);
  const steps = 3;

  useEffect(() => {
    const updateProgress = () => {
      const progress = document.getElementById("progress");
      const circles = document.querySelectorAll(".circle");

      circles.forEach(
        (circle, idx) => {
          if (idx < currentActive) {
            circle.classList.add("active");
          } else {
            circle.classList.remove("active");
          }
        },
        [currentActive]
      );

      const actives = document.querySelectorAll(".active");
      if (progress) {
        progress.style.width =
          ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
      }

      const prevButton = document.getElementById("prev") as HTMLButtonElement;
      const nextButton = document.getElementById("next") as HTMLButtonElement;

      if (prevButton && nextButton) {
        if (currentActive === 1) {
          prevButton.disabled = true;
        } else if (currentActive === circles.length) {
          nextButton.disabled = true;
        } else {
          prevButton.disabled = false;
          nextButton.disabled = false;
        }
      }
    };

    updateProgress();
  }, [currentActive]);

  const nextStep = () => {
    setCurrentActive((prev) => Math.min(prev + 1, steps));
  };

  const prevStep = () => {
    setCurrentActive((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="w-full flex min-h-screen flex-col items-center bg-seashell">
      {elements.map((element, index) => (
        <div
          key={index}
          data-time={element.seconds}
          className={`flex items-center w-full py-2 px-4`}
        >
          
          <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ml-2 transition-all duration-300 ease-in-out ${
            index <= activeElementIndex ? "bg-cherry_blossom" : "bg-opal"
          }`}>
            <PiFlowerLotusLight size={35} />
          </div>
          <p>{element.name}</p>
        
          <div className="flex ml-auto">
            <button onClick={() => handleTimeChange(index, false)}>-</button>
            <p className="mx-2">{element.minutes}</p>
            <button onClick={() => handleTimeChange(index, true)}>+</button>
          </div>

    
        </div>
      ))}

      <button
        id="prev"
        className="btn bg-pink-500 text-aqua-500 rounded-md px-6 py-2 m-2 text-sm"
        onClick={prevStep}
        disabled={currentActive === 1}
      >
        Prev
      </button>
      <button
        id="next"
        className="btn bg-pink-500 text-aqua-500 rounded-md px-6 py-2 m-2 text-sm"
        onClick={nextStep}
        disabled={currentActive === steps}
      >
        Next
      </button>
    </main>
  );
};

export default Bar;

//============

// import React from "react";
// import { PiFlowerLotusLight } from "react-icons/pi";
// import { useState, useEffect } from "react";

// const elements = [
//   { name: "Sri Guru Mantra", seconds: 300, minutes: "5:00", customisable: false},
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Vishuddhi & Nabi Kriya", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Maha Mudra", seconds: 360, minutes: "6:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Central Kriya Pranayam", seconds: 600, minutes: "10:00", customisable: false },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Bumble Bee", seconds: 240, minutes: "4:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Chakra Dharana", seconds: 180, minutes: "3:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Bhastrika Kriya", seconds: 180, minutes: "3:00", customisable: true },
//   { name: "Sit Quietly", seconds: 300, minutes: "5:00", customisable: true },
// ];

// let cumulativeTime = 0;
// const elementsWithCumulativeTime = elements.map((element) => {
//   cumulativeTime += element.seconds;
//   return { ...element, cumulativeTime };
// });

// interface BarProps {
//   activeCountdown: number;
//   resetActiveCountdown: boolean;
// }

// const Bar = ({ activeCountdown, resetActiveCountdown }: BarProps) => {

// const [elements, setElements] = useState(initialElements);

//   // Function to convert seconds to "MM:SS" format
// const convertSecondsToMinutes = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
// };

// // Function to handle increment and decrement
// const handleTimeChange = (index, increment) => {
//   setElements(prevElements => {
//     return prevElements.map((element, i) => {
//       if (i === index && element.customisable) {
//         const newSeconds = element.seconds + (increment ? 60 : -60);
//         return {
//           ...element,
//           seconds: newSeconds > 0 ? newSeconds : 0,
//           minutes: convertSecondsToMinutes(newSeconds > 0 ? newSeconds : 0),
//         };
//       }
//       return element;
//     });
//   });
// };


//   const getActiveElementIndex = () => {
//     const adjustedCountdown = activeCountdown - 1; // Account for 1-second delay
//     if (adjustedCountdown < 0) return -1; // If activeCountdown is less than 1 second, no element should be active

//     for (let i = 0; i < elementsWithCumulativeTime.length; i++) {
//       if (adjustedCountdown < elementsWithCumulativeTime[i].cumulativeTime) {
//         return i;
//       }
//     }
//     return elementsWithCumulativeTime.length - 1;
//   };

//   const activeElementIndex = getActiveElementIndex();

//   console.log("piss lips", activeCountdown);

//   const [currentActive, setCurrentActive] = useState(1);
//   const steps = 3;

//   useEffect(() => {
//     const updateProgress = () => {
//       const progress = document.getElementById("progress");
//       const circles = document.querySelectorAll(".circle");

//       circles.forEach(
//         (circle, idx) => {
//           if (idx < currentActive) {
//             circle.classList.add("active");
//           } else {
//             circle.classList.remove("active");
//           }
//         },
//         [currentActive]
//       );

//       const actives = document.querySelectorAll(".active");
//       if (progress) {
//         progress.style.width =
//           ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
//       }

//       const prevButton = document.getElementById("prev") as HTMLButtonElement;
//       const nextButton = document.getElementById("next") as HTMLButtonElement;

//       if (prevButton && nextButton) {
//         if (currentActive === 1) {
//           prevButton.disabled = true;
//         } else if (currentActive === circles.length) {
//           nextButton.disabled = true;
//         } else {
//           prevButton.disabled = false;
//           nextButton.disabled = false;
//         }
//       }
//     };

//     updateProgress();
//   }, [currentActive]);

//   const nextStep = () => {
//     setCurrentActive((prev) => Math.min(prev + 1, steps));
//   };

//   const prevStep = () => {
//     setCurrentActive((prev) => Math.max(prev - 1, 1));
//   };

//   return (
//     <main className="w-full flex min-h-screen flex-col items-center bg-seashell">
//       {elementsWithCumulativeTime.map((element, index) => (
//         <div
//           key={index}
//           data-time={element.seconds}
//           className={`flex items-center w-full py-2 px-4`}
//         >
          
//           <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ml-2 transition-all duration-300 ease-in-out ${
//             index <= activeElementIndex ? "bg-cherry_blossom" : "bg-opal"
//           }`}>
//             <PiFlowerLotusLight size={35} />
//           </div>
//           <p>{element.name}</p>
        
//           <div className="flex ml-auto">
            
//             <button onClick={() => handleTimeChange(index, false)}>-</button>
//               <p className="mx-2">{element.minutes}</p>
//             <button onClick={() => handleTimeChange(index, true)}>+</button>
//           </div>

    
//         </div>
//       ))}
//     </main>
//   );
// };

// export default Bar;

//-----------


// import React from "react";
// import { PiFlowerLotusLight } from "react-icons/pi";
// import { useState, useEffect } from "react";

// const elements = [
//   { name: "Sri Guru Mantra", seconds: 300, minutes: "5:00", customisable: false},
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Vishuddhi Kriya & Nabi Kriya", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Maha Mudra", seconds: 360, minutes: "6:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Central Kriya Pranayam", seconds: 600, minutes: "10:00", customisable: false },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Bumble Bee", seconds: 240, minutes: "4:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Chakra Dharana", seconds: 180, minutes: "3:00", customisable: true },
//   { name: "Sit Quietly", seconds: 120, minutes: "2:00", customisable: true },
//   { name: "Bhastrika Kriya", seconds: 180, minutes: "3:00", customisable: true },
//   { name: "Sit Quietly", seconds: 300, minutes: "5:00", customisable: true },
// ];


// let cumulativeTime = 0;
// const elementsWithCumulativeTime = elements.map((element) => {
//   cumulativeTime += element.seconds;
//   return { ...element, cumulativeTime };
// });

// interface BarProps {
//   activeCountdown: number;
//   resetActiveCountdown: boolean;
// }

// const Bar = ({ activeCountdown, resetActiveCountdown }: BarProps) => {
//   const getActiveElementIndex = () => {
//     const adjustedCountdown = activeCountdown - 1; // Account for 1-second delay
//     if (adjustedCountdown < 0) return -1; // If activeCountdown is less than 1 second, no element should be active

//     for (let i = 0; i < elementsWithCumulativeTime.length; i++) {
//       if (adjustedCountdown < elementsWithCumulativeTime[i].cumulativeTime) {
//         return i;
//       }
//     }
//     return elementsWithCumulativeTime.length - 1;
//   };

//   const activeElementIndex = getActiveElementIndex();

//   console.log("piss lips", activeCountdown);

//   const [currentActive, setCurrentActive] = useState(1);
//   const steps = 3;

//   useEffect(() => {
//     const updateProgress = () => {
//       const progress = document.getElementById("progress");
//       const circles = document.querySelectorAll(".circle");

//       circles.forEach(
//         (circle, idx) => {
//           if (idx < currentActive) {
//             circle.classList.add("active");
//           } else {
//             circle.classList.remove("active");
//           }
//         },
//         [currentActive]
//       );

//       const actives = document.querySelectorAll(".active");
//       if (progress) {
//         progress.style.width =
//           ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
//       }

//       const prevButton = document.getElementById("prev") as HTMLButtonElement;
//       const nextButton = document.getElementById("next") as HTMLButtonElement;

//       if (prevButton && nextButton) {
//         if (currentActive === 1) {
//           prevButton.disabled = true;
//         } else if (currentActive === circles.length) {
//           nextButton.disabled = true;
//         } else {
//           prevButton.disabled = false;
//           nextButton.disabled = false;
//         }
//       }
//     };

//     updateProgress();
//   }, [currentActive]);

//   const nextStep = () => {
//     setCurrentActive((prev) => Math.min(prev + 1, steps));
//   };

//   const prevStep = () => {
//     setCurrentActive((prev) => Math.max(prev - 1, 1));
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center bg-seashell">
//       {elementsWithCumulativeTime.map((element, index) => (
//         <div
//           key={index}
//           data-time={element.seconds}
//           className={`flex items-center w-full py-2 px-4`}
//         >
//           {/* <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full mr-8 ml-2 ${
//             index <= activeElementIndex ? "bg-cherry_blossom" : "bg-opal"
//           }`}> */}
//           <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full mr-8 ml-2 transition-all duration-300 ease-in-out ${
//             index <= activeElementIndex ? "bg-cherry_blossom" : "bg-opal"
//           }`}>
//             <PiFlowerLotusLight size={35} />
//           </div>
//           <p>{element.name}</p>
//           <p>{element.minutes}</p>
//           <div className="line"></div>
//         </div>
//       ))}

//       {/* <button
//         id="prev"
//         className="btn bg-pink-500 text-aqua-500 rounded-md px-6 py-2 m-2 text-sm"
//         onClick={prevStep}
//         disabled={currentActive === 1}
//       >
//         Prev
//       </button>
//       <button
//         id="next"
//         className="btn bg-pink-500 text-aqua-500 rounded-md px-6 py-2 m-2 text-sm"
//         onClick={nextStep}
//         disabled={currentActive === steps}
//       >
//         Next
//       </button> */}
//     </main>
//   );
// };

// export default Bar;
