"use client"
import React from 'react'
import { useState } from "react";
import Bar from "../components/Bar";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Accordion = ({buttonTitle, firstDropDown, secondDropDown}:{[key:string]:any}) => {

  const [accordionOpen, setAccordionOpen] = useState(false)
  const [secondaryAccordionOpen, setSecondaryAccordionOpen] = useState(false)

  return (
    <div className='w-full md:w-1/2 pb-8'>
      <button onClick={() => setAccordionOpen(!accordionOpen)} className='h-16 flex justify-between items-center w-full bg-opal text-white py-4 px-10 border-b-4 border-seashell rounded'>
        <span>{buttonTitle}</span>
        {accordionOpen ? <span><MdOutlineKeyboardArrowUp /></span> : <span><MdOutlineKeyboardArrowDown /></span>}
      </button>

      <div className={`grid overflow-hidden bg-crystal_blue transition-all duration-300 ease-in-out text-slate-600 text-sm border-b-seashell ${
          accordionOpen 
          ? 'grid-rows-[auto auto] opacity-100'
          : 'grid-rows-[0fr] hidden opacity-0'
          }`}
          >
          <div className='w-full overflow-hidden h-16 flex items-center px-5'>{firstDropDown}</div>

          <button onClick={() => setSecondaryAccordionOpen(!secondaryAccordionOpen)} className='h-12 flex justify-between items-center w-full bg-opal text-white py-4 px-10 border-b-4 border-seashell'>
              <span>Customise your Practice</span>
              {secondaryAccordionOpen ? <span><MdOutlineKeyboardArrowUp /></span> : <span><MdOutlineKeyboardArrowDown /></span>}
          </button>

          <div className={`grid overflow-hidden bg-crystal_blue transition-all duration-300 ease-in-out text-slate-600 text-sm ${
            secondaryAccordionOpen 
            ? 'grid-rows-[auto auto] opacity-100'
            : 'grid-rows-[0fr] hidden opacity-0'
            }`}
            >
            <div className='overflow-hidden'>{secondDropDown}</div>
          </div>
      </div>
    </div>
  )
}

export default Accordion
