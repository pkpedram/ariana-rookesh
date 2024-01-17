import React, { useState } from 'react'
import { RootState } from '../../Redux/store'
import { connect } from 'react-redux'
import { ProductListItem } from '../../Redux/Reducers/reducerTypes'
import RelatedBooks from '../RelatedBooks'

export type BookDetailsPorps = {
    productInfo: ProductListItem,
    isMobile: boolean
}

const BookDetails = ({
    productInfo
} : BookDetailsPorps) => {

    const [selectedPart, setSelectedPart] = useState(0)

    let parts = [
        {
            id: 0,
            title: 'توضیحات',
            component: (
            <div 
            className='w-full [&>p]:text-justify [&>p]:leading-relaxed [&>p]:mb-3'
            dangerouslySetInnerHTML={{__html: productInfo.htmlDescription}}></div>
            )
        },
        {
            id: 1,
            title: 'کتاب های مرتبط',
            component: <RelatedBooks />
        }
    ]

  return (
    <div className='w-full  shadow-xl bg-white rounded-2xl overflow-hidden' >
        <div className='w-full flex border-b-4  border-main-blue overflow-hidden relative'>
                {
                    parts.map(item => (
                        <div
                        onClick={() => setSelectedPart(item.id)}
                        key={`PART_${item.id}`} className={`w-40 text-center text-lg cursor-pointer  p-4 ${selectedPart == item.id ? 'bg-main-blue text-white' : 'text-main-blue hover:bg-main-blue/50'}`}>
                            {item.title}
                        </div>
                    ))
                }
        </div>

        <div className='p-4'>
            {
                parts?.find(itm => itm.id == selectedPart)?.component
            }
        </div>
    </div>
  )
}

const mapStateToProps = (state : RootState) => ({
    productInfo: state.productState.productInfo,
    isMobile: state.publicState.isMobile
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails)