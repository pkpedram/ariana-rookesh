import React from 'react'

const BookListItemLoading = () => {
  return (
    <div
      className="w-full animate-pulse bg-white p-3 flex flex-col justify-between overflow-hidden rounded-lg border hover:shadow-lg "
    >
      <div>
        <div className="w-full overflow-hidden bg-black/30 rounded-lg flex justify-center h-40 relative">
        
        </div>

        <p className="text-sm mt-3 mb-1 font-bold h-2 w-4/5 bg-black/60 rounded-full"></p>
        <p className="text-xs text-gray-500 h-1 w-full bg-black/40 rounded-full mt-2">
          
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="mt-4 bg-black/60 h-2 w-1/2 rounded-full"></p>
        
      </div>
    </div>
  )
}

export default BookListItemLoading