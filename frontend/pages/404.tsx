import React from 'react'
import logo from '../public/assets/image/logo.png'
import Image from 'next/image'
import {useRouter} from 'next/router'

const Error404Page = () => {
    const router = useRouter()
  return (
    <div className="w-full flex flex-col items-center py-40">
    <Image src={'https://taaghche.com/images/book.png'} width={200} height={200} alt="لوگو" />
    <h2 className="text-2xl text-main-blue font-bold mb-3">صفحه مورد نظر پیدا نشد</h2>
    <button
    className="w-40 h-10 rounded-md bg-main-blue text-white"
      type="button"
      onClick={() => router.replace('/')}
    >
       بازگشت به صفحه اصلی
    </button>
  </div>
  )
}

export default Error404Page