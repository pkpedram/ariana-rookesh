import React, { Suspense, useState } from 'react'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Loading from './components/Loading'
import { connect } from 'react-redux'

const Layout = ({children, isLoading}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    
    <div className='w-full h-screen bg-dark flex flex-col '>
      <Header setSideBarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
        <div className='w-full flex-1 flex overflow-hidden'>
          <SideBar  setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
        
           
        <div  className='w-full flex-1 relative overflow-x-hidden overflow-scroll p-6'>
        {isLoading && <Loading />}
        {children}

        </div>
      
        </div>
    </div>

  )
}

const mapStateToProps = state => ({
  isLoading: state.publicState.loading
})

export default connect(mapStateToProps)(Layout)