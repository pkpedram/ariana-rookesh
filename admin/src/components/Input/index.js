import React from 'react'

const Input = ({value, onChange, placeholder, className, type, name}) => {
  return (
    <input value={value} onChange={onChange} 
    type={type ? type : 'text'}
    placeholder={placeholder}
    name={name}
    className={`w-full h-10 px-3 text-white bg-white/20 outline-none rounded-md ${value?.length !== 0 ? 'border border-primary-600' : 'border border-transparent'} ${className}`} />
  )
}

export default Input