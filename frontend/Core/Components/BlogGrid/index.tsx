import React from 'react'
import { apiConfig } from '../../Redux/constants'
import Link  from 'next/link';

const BlogGrid = ({items , title , isMore,color}:any) => {

    // console.log(items)
  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <p className={`font-bold text-2xl ${color == 'white' ? "text-white" :""}`}>{title}</p>
            {isMore &&

            <Link href={`/blogs/${items[0].relatedBlogCategory}`}>
            <div className={`flex items-center gap-1 ${color == 'white' ? "text-white" :""}`}>
                <p>
                    مشاهده همه
                </p>
                <svg width="5" height="15" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.09716 19.7948L10 17.4689L3.81916 9.8974L10 2.32588L8.09717 -5.92785e-06L-2.54292e-07 9.8974L8.09716 19.7948Z" fill={color}/>
                </svg>
            </div>
            </Link>
            }
        </div>
            <div className='flex gap-7 2lg:flex-col'> 
                {items?.slice(0,1)?.map((item:any)=>(
                    <>
                        <div key={item?._id} className={`p-4 border border-[#000] rounded-xl gap-2 justify-between hidden 2lg:flex md:flex-col md:items-center ${color == 'white' ? "text-white border-[#FFF]" :""}`}>
                            <div className='rounded-xl w-2/4 md:w-full'><img className='object-cover w-full h-full rounded-xl' src={apiConfig.domain + item.image} alt="" /></div>
                            <div className="flex flex-col justify-between w-full">
                                <h3 className={`font-bold text-xl`}>{item?.title}</h3>
                                <p className='text-justify text-md overflow-hidden' >{item.content.length > 200 ? item.content.substring(0,200) + "..." : item?.content}</p>
                                <div className="flex items-center gap-1 text-sm text-[#979797]">
                                    <p>{new Date(item?.created_date).toLocaleDateString("fa-ir",{year:'numeric',month:'long',day:'numeric'})}</p>
                                    |
                                    <p>{item?.category}</p>
                                </div>
                                <div className='w-full flex justify-end'>
                                    <Link href={`/blogs/blog/${item?._id}`}>
                                        <button className={`text-white bg-black rounded-xl px-4 py-2  ${color == 'white' ? "!text-black bg-white" :""}`}>ادامه مطلب</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={`p-4 border border-[#000] rounded-xl flex flex-col gap-2 justify-between w-3/12 2lg:hidden  ${color == 'white' ? "text-white border-[#FFF]" :""}`} key={item?._id}>
                            <div className='rounded-xl'><img className='object-cover w-full rounded-xl' src={apiConfig.domain + item.image} alt="" /></div>
                            <h3 className='font-bold text-xl'>{item?.title}</h3>
                            <p className='text-justify text-md overflow-hidden'>{item.content.length > 200 ? item.content.substring(0,200) + "..." : item?.content}</p>
                            <div className="flex items-center gap-1 text-sm text-[#979797]">
                                <p>{new Date(item?.created_date).toLocaleDateString("fa-ir",{year:'numeric',month:'long',day:'numeric'})}</p>
                                |
                                <p>{item?.category}</p>
                            </div>
                            <div className='w-full flex justify-end'>
                                <Link href={`/blogs/blog/${item?._id}`}>
                                    <button className={`text-white bg-black rounded-xl px-4 py-2  ${color == 'white' ? "!text-black bg-white" :""}`}>ادامه مطلب</button>
                                </Link>
                            </div>
                        </div>
                    </>
                    
                ))}
                <div className='flex flex-col justify-between w-3/4 2lg:w-full gap-6'>
                    {
                        items?.slice(1,3)?.map((item:any)=>(
                            <div key={item?._id} className={`p-4 border border-[#000] rounded-xl flex gap-2 justify-between md:flex-col md:items-center ${color == 'white' ? "text-white !border-[#FFF]" :""}`}>
                            <div className='rounded-xl w-2/4 md:w-full'><img className='object-cover w-full h-full rounded-xl' src={apiConfig.domain + item.image} alt="" /></div>
                            <div className="flex flex-col justify-between w-full">
                                <h3 className='font-bold text-xl'>{item?.title}</h3>
                                <p className='text-justify text-md overflow-hidden' >{item.content.length > 200 ? item.content.substring(0,200) + "..." : item?.content}</p>
                                <div className="flex items-center gap-1 text-sm text-[#979797]">
                                    <p>{new Date(item?.created_date).toLocaleDateString("fa-ir",{year:'numeric',month:'long',day:'numeric'})}</p>
                                    |
                                    <p>{item?.category}</p>
                                </div>
                                <div className='w-full flex justify-end'>
                                    <Link href={`/blogs/blog/${item?._id}`}>
                                        <button className={`text-white bg-black rounded-xl px-4 py-2  ${color == 'white' ? "!text-black bg-white" :""}`}>ادامه مطلب</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
    </div>
  )
}

export default BlogGrid