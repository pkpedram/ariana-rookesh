import React from 'react'

const TextBox = ({value, onChange, placeholder, name, className}) => {
  return (
    <textarea value={value} onChange={onChange} 
    placeholder={placeholder}
    name={name}
    className={`w-full h-40 p-3 text-white bg-white/20 outline-none rounded-md ${value?.length !== 0 ? 'border border-primary-600' : 'border border-transparent'} ${className}`} ></textarea>
  
  )
}

export default TextBox