import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {BsList} from 'react-icons/bs'

// assets
import logo from "../../../../public/assets/image/logo.png";
import { PiHandbagLight } from 'react-icons/pi';

const MobileHeaderTop = () => {
  return (
    <div className='w-full flex items-center justify-between'>
            <p><BsList /></p>
            <Link href={"/"}>
      <div className="grayscale hover:grayscale-0 curs">
        <Image src={logo} alt="logo" height={50} />
      </div>
    </Link>
    <Link href={"https://taaghche.com/cart"}>
        <div className="text-2xl relative cursor-pointer">
          <PiHandbagLight />
          <div className="w-4 h-4 flex items-center absolute bottom-0 right-0 justify-center text-center  text-xs rounded-full bg-main-blue">
            ۰
          </div>
        </div>
      </Link>

    </div>
  )
}

export default MobileHeaderTop