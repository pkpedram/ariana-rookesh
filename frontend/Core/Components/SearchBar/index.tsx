import React from 'react'
import {CiSearch} from 'react-icons/ci'
import { RootState } from '../../Redux/store'
import { connect } from 'react-redux'

export interface SearchBarProps {
  isMobile: boolean
}

const SearchBar = ({isMobile}: SearchBarProps) => {
  return (
    <div className={`${isMobile ? 'w-full' : 'w-4/5'} rounded-3xl bg-light-gray p-1`}>
        <div className='w-full flex items-center justify-between px-2 gap-2'>
        <p>
          <CiSearch />
        </p>
        <input type='search' className={`${isMobile ? 'h-8 text-center text-sm text-gray-700' : 'h-10'} w-full bg-transparent outline-none`} placeholder='جست و جو در طاقچه'/>
        </div>
    </div>
  )
}

const mapStateToProps = (state : RootState) => ({
  isMobile: state.publicState.isMobile
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps , mapDispatchToProps)(SearchBar)