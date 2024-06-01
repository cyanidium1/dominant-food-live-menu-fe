import React from 'react';

import smoke1 from './photo/smoke1.gif'
import smoke2 from './photo/smoke2.gif'
import hero from './photo/hero.png'

function Header() {
    return (
        <header className="h-[20vh] header text-orange-500 p-0 m-0">
            <div className='flex h-full relative'>
                <div className='absolute inset-0 flex justify-center items-center'>
                    <div className="h-full font-extrabold text-white text-9xl px-20 box-border flex items-center">
                        <p style={{ WebkitTextStroke: '4px orange', textStroke: '4px orange' }}>Dominant</p>
                        <img className='w-32 h-32 mx-2' src={hero} alt="" />
                        <p className='' style={{ WebkitTextStroke: '4px orange', textStroke: '4px orange' }}>Food</p>
                    </div>
                </div>
                <img src={smoke1} alt="" srcset="" />
                <div className='bg-black w-full'></div>
                <img src={smoke2} alt="" srcset="" />
            </div>
        </header>
    );
}

export default Header;
