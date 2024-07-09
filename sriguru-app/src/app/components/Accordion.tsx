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
    <div className='w-full'>
        <button onClick={() => setAccordionOpen(!accordionOpen)} className='w-full md:w-1/2 bg-opal text-white py-4 px-4 border-b-4 border-crystal_blue hover:border-seashell rounded'>
          <span>{buttonTitle}</span>
          {accordionOpen ? <span><MdOutlineKeyboardArrowUp /></span> : <span><MdOutlineKeyboardArrowDown /></span>}
        </button>

        <div className={`grid overflow-hidden bg-crystal_blue transition-all duration-300 ease-in-out text-slate-600 text-sm ${
            accordionOpen 
            ? 'grid-rows-[auto auto] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
            }`}
            >
            <div className='overflow-hidden'>{firstDropDown}</div>

            {/* <div className='overflow-hidden'>View The Steps</div> */}
            <button onClick={() => setSecondaryAccordionOpen(!secondaryAccordionOpen)} className='w-full md:w-1/2 bg-opal text-white py-4 px-4 border-b-4 border-crystal_blue hover:border-seashell rounded'>
                <span>View the steps</span>
                {secondaryAccordionOpen ? <span><MdOutlineKeyboardArrowUp /></span> : <span><MdOutlineKeyboardArrowDown /></span>}
            </button>
            <div className={`grid overflow-hidden bg-crystal_blue transition-all duration-300 ease-in-out text-slate-600 text-sm ${
            secondaryAccordionOpen 
            ? 'grid-rows-[auto auto] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
            }`}
            >
            <div className='overflow-hidden'>{secondDropDown}</div>
            </div>
        </div>
    </div>
  )
}

export default Accordion
