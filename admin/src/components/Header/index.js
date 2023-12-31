import React from 'react'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import logo from '../../assets/icons/NoavLogo.svg'
import { connect } from 'react-redux'
import { ApiConfig } from '../../redux/constants'


const Header = ({userData, client, sidebarOpen, setSideBarOpen}) => {
  return (
    <div className='w-full z-40 h-14 bg-gray-900 shadow-lg px-8 flex items-center justify-between'>
        <p onClick={() => setSideBarOpen(!sidebarOpen)} className='text-2xl text-gray-200 cursor-pointer'>{sidebarOpen ? <AiOutlineClose /> :<AiOutlineMenu />}</p>
        <img src={client ? ApiConfig.domain + userData.logo : logo} className='h-8' />
    </div>
  )
}

const mapStateToProps = state => ({
    client: state.userState.client,
    userData: state.userState.userData
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)