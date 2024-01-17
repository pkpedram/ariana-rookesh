import React from 'react'
import { categories } from '../../Redux/Reducers/reducerTypes'
import Link from 'next/link'
import {BsChevronLeft} from 'react-icons/bs'

type bookInfo = {
    name: string;
    link: string
}

type BreadCrumbProps = {
    categories: Array<categories>;
    info: bookInfo
}

const BreadCrumb = ({categories, info} : BreadCrumbProps) => {
  return (
    <div className='w-full flex flex-wrap items-center text-sm text-black'>
        <Link href="https://taaghche.com">
            طاقچه
        </Link>
        <p><BsChevronLeft /></p>
        {
          categories.map((item) => (
            <>
            <Link href={`https://taaghche.com/category/${item.slug}`} key={`BREADCRUMB_CATEGORY_${item.id}`}>
              {item.title}
            </Link>
            
       <p key={`BREADCRUMB_CHEVRON_${item.id}`}><BsChevronLeft /></p>
            

            </>
          ))
        }
        <Link href={info.link}>
          {info.name}
        </Link>
    </div>
  )
}

export default BreadCrumb