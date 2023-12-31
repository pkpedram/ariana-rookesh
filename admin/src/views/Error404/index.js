import React from 'react'
import errorImage from '../../assets/images/404.svg'

const Error404 = () => {
  return (
    <div className='w-full h-full flex items-center flex-col justify-center'>
            <img src={errorImage} />

            <h1 className='text-xl mt-6 text-white'>خطا! صفحه مورد نظر پیدا نشد</h1>
    </div>
  )
}

export default Error404