import React from 'react'
import { PiCubeFocusBold } from 'react-icons/pi'

const Loading = () => {
  return (
    <div className='w-full h-full absolute z-[999] bg-dark/70 backdrop-blur-md flex items-center justify-center top-0 right-0'>
        <div className='flex flex-col items-center'>
            <p className='text-8xl text-primary-800 animate-ping'><PiCubeFocusBold /></p>
            <p className='mt-6 text-primary-800 text-lg'>لطفا شکیبا باشید...</p>
        </div>
    </div>
  )
}

export default Loading