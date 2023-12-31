import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({link, children, onClick, className, type}) => {
  return (
    link ? 
    <Link to={link}>{children}</Link>
    : <button 
    type={type}
    className={` flex items-center justify-center text-white w-full h-10 rounded-md hover:shadow-lg bg-primary-550 ${className}`} onClick={onClick}>{children}</button>
  )
}

export default Button