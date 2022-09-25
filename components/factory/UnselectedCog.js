import React from 'react';
import { HiCog } from 'react-icons/hi';
import { ImPlus } from 'react-icons/im';


const UnselectedCog = ({ setOpenModal }) => {
  return (
    <div
      className="relative w-min"
      onClick={() => setOpenModal(true)}
    >
      <ImPlus className='text-[#D65A31] peer-hover:text-white hover:text-white w-48 h-48 p-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 peer' />
      <HiCog className='text-[#393E46] hover:text-[#D65A31] peer-hover:text-[#D65A31] w-48 h-48' />
    </div>
  )
}

export default UnselectedCog