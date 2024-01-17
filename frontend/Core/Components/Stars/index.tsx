import React, { useState } from 'react'
import { BsStarFill } from 'react-icons/bs'

type starProps = {
    value: number
}

const Stars = ({value} : starProps) => {


  return (
    <div className='flex'>
{
        [...Array(value)].map((val, i) => {
            return <div key={i} className={'ltr text-yellow-500'} ><BsStarFill /></div>
        })
}
    </div>
  )
}

export default Stars