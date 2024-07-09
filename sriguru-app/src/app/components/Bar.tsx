import React from "react";
import { PiFlowerLotusLight } from "react-icons/pi";
import { useState, useEffect } from "react";

const elements = [
  { name: "Sri Guru Mantra", time: 5 }, // 5 mins
  { name: "Sit Quietly", time: 120 }, // 2 mins
  { name: "Vishuddhi Kriya & Nabi Kriya", time: 240 }, // 4 mins
  { name: "Sit Quietly", time: 120 }, // 2 mins
  { name: "Maha Mudra", time: 360 }, // 6 mins
  { name: "Sit Quietly", time: 120 }, // 2 mins
  { name: "Central Kriya Pranayam", time: 720 }, // 12 mins
  { name: "Sit Quietly", time: 120 }, // 2 mins
  { name: "Bumble Bee", time: 300 }, // 5 mins
  { name: "Sit Quietly", time: 120 }, // 2 mins
  { name: "Chakra Dharana", time: 360 }, // 6 mins
  { name: "Sit Quietly", time: 120 }, // 2 mins
  { name: "Bhastrika Kriya", time: 180 }, // 3 mins
  { name: "Sit Quietly", time: 300 }, // 5 mins
];

let cumulativeTime = 0;
const elementsWithCumulativeTime = elements.map((element) => {
  cumulativeTime += element.time;
  return { ...element, cumulativeTime };
});

interface BarProps {
  activeCountdown: number;
  resetActiveCountdown: boolean;
}

const Bar = ({ activeCountdown, resetActiveCountdown }: BarProps) => {
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
    <main className="flex min-h-screen flex-col items-center bg-pale_pink">
      {elementsWithCumulativeTime.map((element, index) => (
        <div
          key={index}
          data-time={element.time}
          className={`flex items-center w-full py-2 px-4 ${
            index <= activeElementIndex ? "bg-active" : "bg-seashell"
          }`}
        >
          <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-opal mr-8 ml-2">
            <PiFlowerLotusLight size={35} />
          </div>
          <p>{element.name}</p>
          <div className="line"></div>
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
