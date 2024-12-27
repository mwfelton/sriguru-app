"use client"
import React from 'react'
import { useState } from "react";
import Bar from "./Bar";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Accordion2 = () => {

  const [accordionOpen, setAccordionOpen] = useState(false)

  return (
    <div className='w-full md:w-1/2 pb-8'>
      <button onClick={() => setAccordionOpen(!accordionOpen)} className='h-16 flex justify-between items-center w-full bg-pale_pink text-white py-4 px-10 border-b-4 border-seashell rounded'>
        <span>Customise</span>
        {accordionOpen ? <span><MdOutlineKeyboardArrowUp /></span> : <span><MdOutlineKeyboardArrowDown /></span>}
      </button>

      <div className={`w-full grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen 
          ? 'grid-rows-[auto auto] opacity-100'
          : 'grid-rows-[0fr] hidden opacity-0'
          }`}
          >
          <div className='w-full overflow-hidden flex items-center'>{<Bar />}</div>
      </div>
    </div>
  )
}

export default Accordion2
