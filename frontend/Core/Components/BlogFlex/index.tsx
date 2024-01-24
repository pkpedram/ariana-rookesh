import Link from 'next/link'
import React from 'react'
import { apiConfig } from '../../Redux/constants'

const BlogFlex = ({items , title , isMore,color}:any) => {
  return (
    <div className="flex flex-col items-center gap-4 w-4/5 mx-auto">
        <div className="flex items-center justify-between w-full">
            <p className={`font-bold text-2xl ${color == 'white' ? "text-white" :""}`}>{title}</p>
            {isMore &&

            <div className={`flex items-center gap-1 ${color == 'white' ? "text-white" :""}`}>
                <p>
                    مشاهده همه
                </p>
                <svg width="5" height="15" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.09716 19.7948L10 17.4689L3.81916 9.8974L10 2.32588L8.09717 -5.92785e-06L-2.54292e-07 9.8974L8.09716 19.7948Z" fill={color}/>
                </svg>
            </div>
            }
        </div>
        <div className='flex gap-6 justify-between w-full 2lg:flex-col 2lg:items-center'>
                    {
                        items?.map((item:any)=>(
                            <div className={`p-4 border border-[#000] rounded-xl flex flex-col gap-2 justify-between w-1/3  2lg:w-full ${color == 'white' ? "text-white border-[#FFF]" :""}`} key={item?.id}>
                            <div className='rounded-xl h-2/6'><img className='object-cover !h-full !w-full rounded-xl' src={apiConfig.domain + item.image} alt="" /></div>
                            <h3 className='font-bold text-xl'>{item?.title}</h3>
                            <p className='text-justify text-md'>{item.content.length > 200 ? item.content.substring(0,200) + "..." : item?.content}</p>
                            <div className="flex items-center gap-1 text-sm text-[#979797]">
                                <p>{new Date(item?.created_date).toLocaleDateString("fa-ir",{year:'numeric',month:'long',day:'numeric'})}</p>
                                |
                                <p>{item?.category}</p>
                            </div>
                            <div className='w-full flex justify-end'>
                                <Link href={`/blogs/blog/${item?.id}`}>
                                    <button className={`text-white bg-black rounded-xl px-4 py-2  ${color == 'white' ? "!text-black bg-white" :""}`}>ادامه مطلب</button>
                                </Link>
                            </div>
                        </div>
                        ))
                    }
        </div> 
    </div>
  )
}

export default BlogFlex