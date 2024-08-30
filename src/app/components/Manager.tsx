import React from "react";
import { PiFlowerLotusLight } from "react-icons/pi";
import { useState, useEffect } from "react";
import data from '../kriya.json';

const Manager = () => {
  return (
    <main className="w-full flex min-h-screen flex-col items-center bg-seashell">
      {data.map((element, index) => (
        <div
          key={index}
          data-time={element.seconds}
          className={`flex items-center w-full py-2 px-4`}
        >
          
          <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ml-2 transition-all duration-300 ease-in-out bg-cherry_blossom"
          }`}>
            <PiFlowerLotusLight size={35} />
          </div>
          <p>{element.name}</p>
        
          <div className="flex ml-auto">
            <button>-</button>
            <p className="mx-2">{element.minutes}</p>
            <button>+</button>
          </div>
    
        </div>
      ))}
    </main>
  );
};

export default Manager;
