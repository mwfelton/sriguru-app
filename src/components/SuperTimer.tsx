import React, { useState } from 'react';
import Timer2 from "./Timer2";
import Bar from "./Bar";
import Accordion2 from './Accordion2';

const SuperTimer = () => {

    const [startKriya, setStartKriya] = useState(false);

    const handleStartKriya = () => {
        setStartKriya(!startKriya); // Toggle startKriya state
      };


  return (
    <>
        <Timer2 />
        <Bar />
    
    </>
  )
}

export default SuperTimer