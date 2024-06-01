import React from 'react';

import fire from './photo/fire.gif'
import fireM from './photo/fireM.gif'

function Fire() {
    return (
        <div className='h-[10vh] flex w-full bg-black'>
            <img className='w-1/4  opacity-80' src={fireM} alt="" />
            <img className='w-1/4  opacity-80' src={fire} alt="" />
            <img className='w-1/4  opacity-80' src={fireM} alt="" />
            <img className='w-1/4  opacity-80' src={fire} alt="" />
        </div>
    );
}

export default Fire;
