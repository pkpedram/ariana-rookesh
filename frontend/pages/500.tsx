import React from 'react'
import logo from '../public/assets/image/logo.png'
import Image from 'next/image'

const Error500Page = () => {
  return (
    <div className="w-full flex flex-col items-center pb-40">
    <Image src={logo} alt="لوگو" />
    <h2 className="text-2xl text-main-blue font-bold mb-3">مشکلی پیش آمده است!</h2>
    <button
    className="w-40 h-10 rounded-md bg-main-blue text-white"
      type="button"
      onClick={() => location.reload()}
    >
      امتحان دوباره؟
    </button>
  </div>
  )
}

export default Error500Page