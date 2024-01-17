import React, { useState } from 'react'
import { bookTypes } from '../../../Redux/Reducers/reducerTypes'
import {FaChevronDown} from 'react-icons/fa'
import Link from 'next/link'
type BookTypesAndPricesProps = {
    physical: {
        has: boolean,
        price: number,
        beforeOffPrice: number,
    },
    otherTypes: Array<bookTypes>,
    bookId: number
}

const BookTypesAndPrices = ({otherTypes, physical, bookId} : BookTypesAndPricesProps) => {
  const [expandPhysical, setExpandPhysical] = useState(true)
  const [expandedType, setExpandedType] = useState<number | null>(otherTypes[0]?.id)
  return (
    <div className='w-96 2md:w-full bg-white p-4 rounded-3xl flex flex-col gap-4 justify-center'>
        {
          !physical.has && 
          <div className={`bg-white w-full shadow-lg ${expandPhysical ? 'rounded-xl' : 'rounded-full'} border`}>
            <div className={`p-3 ${expandPhysical && 'border-b-4 border-main-blue'} flex items-center justify-between`}>
                <p className='text-lg text-main-blue'>نسخه فیزیکی</p>
                <p
                onClick={() => setExpandPhysical(!expandPhysical)}
                className={`text-lg text-main-blue cursor-pointer ${expandPhysical ? 'rotate-180' : ''}`}><FaChevronDown /></p>
              </div>

              {
                expandPhysical && <div className='py-4 text-center text-lg text-main-blue'>
                    این کتاب نسخه فیزیکی ندارد
                  </div>
              }
          </div>
        }

        {
          otherTypes.map(item => (
            <div className={`bg-white w-full shadow-lg ${expandedType == item.id ? 'rounded-xl' : 'rounded-full'} border`}>
            <div className={`p-3 ${expandedType == item.id && 'border-b-4 border-main-blue'} flex items-center justify-between`}>
                <p className='text-lg text-main-blue'>نسخه {item.name}</p>
                <p
                onClick={() => expandedType == item.id ? setExpandedType(null) : setExpandedType(item.id)}
                className={`text-lg text-main-blue cursor-pointer ${expandedType == item.id ? 'rotate-180' : ''}`}><FaChevronDown /></p>
              </div>

              {
                expandedType == item.id && <div className='py-4 text-center text-lg text-main-blue'>
                    {item.price == 0 ? 'رایگان' : item.price.toLocaleString('fa-ir') + ' تومان'}
                  </div>
              }
          </div>
          ))
        }

        <Link href={`https://taaghche.com/book/${bookId}`} className='w-full bg-main-blue hover:shadow-xl text-white p-3 rounded-full text-center'>
          جزییات بیشتر
        </Link>
    </div>
  )
}

export default BookTypesAndPrices