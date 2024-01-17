import React from 'react'
import { RootState } from '../../Redux/store'
import { connect } from 'react-redux'
import BookListItem from '../BookList/BookListItem'
import { ProductListItem } from '../../Redux/Reducers/reducerTypes'

const RelatedBooks = ({relatedProductsList} : {relatedProductsList: Array<any>}) => {
  return (
    <div className='w-full'>
        {
            relatedProductsList.map(item => (
                <div className='w-full mb-8' key={`RELATED_BOOK_SECTION_${item?.title}`}>
                    <h1 className='text-lg text-main-blue mb-2'>{item.title}</h1>

                    <div className='w-full grid grid-cols-4 md:grid-cols-1 gap-4'>
                        {
                            item?.bookData?.books?.map((book: ProductListItem) => <BookListItem key={`RELATED_BOOK_${book.id}__${item.id}`} item={book} />)
                        }
                    </div>
                </div>
            ))
        }
    </div>
  )
}
const mapStateToProps = (state : RootState) => ({
    relatedProductsList: state.productState.relatedProductsList
})
const mapDispatchToProps = {
    
}
export default connect(mapStateToProps, mapDispatchToProps)(RelatedBooks)