import React from 'react'
import { ApiConfig } from '../../redux/constants'
import {PiCubeFocusFill} from 'react-icons/pi'
import Scene from '../Scene'

const ObjectInput = ({value, onChange, name, id, title, deleteFile, className}) => {
  return (
    <div className={`w-full ${value ? 'h-[50rem]' : 'h-full'} flex flex-col ${className}`}>
    <input type='file' className='hidden' name={name} onChange={onChange} id={id}/>
    <p className='mb-3 text-primary-550 text-lg'>{title}</p>
    <label htmlFor={id} className={`w-full flex-1  z-10 cursor-pointer justify-center  bg-white/10 min-h-max h-full p-6 rounded-md flex flex-col items-center`}>
        

        {
            (
                value ? 
                ( typeof value !== 'string' ?
                     <Scene obj={URL.createObjectURL(value)} />
                     
                     :
                    <>
                       <Scene obj={ApiConfig.domain + value} className='h-full rounded-md' />
                       <p className='text-primary-600 mt-3'>برای تغییر کلیک کنید</p>
                       </> )
                
                : 
                <>
                <p className='text-primary-600 text-9xl'><PiCubeFocusFill /></p>
                <p className='text-primary-600'>برای انتخاب آبجکت کلیک کنید</p>
            </>
             )
        }
    </label>
  
        {
            value &&   <div onClick={deleteFile} className='w-full mt-2 p-2 bg-red-700 text-white rounded-md text-center cursor-pointer'>
            حذف آبجکت
        </div>
        }
    </div>
  )
}

export default ObjectInput