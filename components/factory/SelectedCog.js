import React from 'react'
import { HiCog } from 'react-icons/hi';
import { VscCircleLargeFilled } from 'react-icons/vsc';

const SelectedCog = ({ path }) => {
    return (
        <div
            className="relative w-min"
        >
            <HiCog className='text-[#D65A31] w-48 h-48 animate-[spin_30s_linear_infinite]' />
            <VscCircleLargeFilled className='text-[#D65A31] w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            <div className='text-white text-xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                {path}
            </div>
        </div>
    )
}

export default SelectedCog