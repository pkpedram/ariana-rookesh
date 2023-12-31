import React, { useState } from "react";

const Icon = ({ icon, title, background, color, onClick }) => {
  const [showTitle, setShowtitle] = useState(false);
  
  return (
    <div
      className={`${background} ${
        color ? color : "text-white"
      } relative w-8 h-8 flex items-center mx-2
       justify-center rounded-full cursor-pointer`}
      onClick={onClick}
      onMouseOver={() => setShowtitle(true)}
      onMouseLeave={() => setShowtitle(false)}
    >
      
        {
         showTitle && title && title.length !== 0 && <span className={`text-xs 
          absolute z-50 min-w-fit text-center
           bg-black bg-opacity-80 p-2 rounded-md 
             transition-all md:ease-in duration-300 min-w-40
             easy ${showTitle ? 'opacity-100 -top-16 ' : 'opacity-0 top-0  '}`} >
            {title}
          </span>
        }
      
      {icon}
    </div>
  );
};

export default Icon;
