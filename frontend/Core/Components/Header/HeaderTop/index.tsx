import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from '../../SearchBar'
import { PiHandbagLight } from 'react-icons/pi'

// assets
import logo from "../../../../public/assets/image/logo.png";

const HeaderTop = () => {
  return (
    <div className="w-full max-w-[75rem] flex items-center gap-8 justify-between">
    <Link href={"/"}>
      <div className="grayscale hover:grayscale-0 curs">
        <Image src={logo} alt="logo" height={95} />
      </div>
    </Link>

    <SearchBar />

    <div className="flex items-center gap-4 w-24 justify-center">
      <Link href={"https://taaghche.com/cart"}>
        <div className="text-2xl relative cursor-pointer">
          <PiHandbagLight />
          <div className="w-4 h-4 flex items-center absolute bottom-0 right-0 justify-center text-center  text-xs rounded-full bg-main-blue">
            ۰
          </div>
        </div>
      </Link>

      <Link href={"https://taaghche.com/login"}>
        <p className="text-sm">ورود</p>
      </Link>
    </div>
  </div>
  )
}

export default HeaderTop