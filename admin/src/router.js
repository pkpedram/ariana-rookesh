import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from './layout'
import HelloWorldPage from './views/HelloWorld'
import userActions from './redux/actions/User'
import Login from './views/Login'
import ClientDashboard from './views/ClientDashboard'
import AdminDashboard from './views/AdminDashboard'
import Error404 from './views/Error404'
import Scenes from './views/Scenes'
import Clients from './views/Clients'
import ClientsEditPage from './views/Clients/Detail'
import SceneEditPage from './views/Scenes/Detail'
import Category from './views/Category'
import Places from './views/Places'
import Settings from './views/Settings'
import Parts from './views/Parts'
import PartDetailPage from './views/Parts/Details'
import Users from './views/Users'

const CostumeRouter = ({setUserStatus, isLogin, client}) => {

  useEffect(() => {
    setUserStatus()
  }, [])

  let routes = [
    {
      path: '/',
      element: client ?  <ClientDashboard /> : <AdminDashboard />
    },
    {
      path: '/scenes',
      element: <Scenes />
    },
    {
      path: '/scenes/:id',
      element: <SceneEditPage />
    },
    {
      path: '/scene/add',
      element: <SceneEditPage />
    },
    {
      path: '/clients',
      element: <Clients />
    },
    {
      path: '/client/:id',
      element: <ClientsEditPage />
    },
    {
      path: '/clients/add',
      element: <ClientsEditPage />
    },
    {
      path: '/part-categories',
      element: <Category />
    },
    {
      path: '/places',
      element: <Places />
    },
    !client &&{
      path: '/settings',
      element: <Settings />
    },
    {
      path: '/parts',
      element: <Parts />
    },
    {
      path: '/part/add',
      element: <PartDetailPage />
    },
    {
      path: '/parts/:id',
      element: <PartDetailPage />
    },
    {
      path: '/users',
      element: <Users />
    },
    {
      path: '*',
      element: <Error404 />
    }
  ]



  return (
    <BrowserRouter>
    {
    
      <Routes>
        {
          !isLogin ? <Route path='*' element={ <Login /> } /> :
          routes.filter(itm => typeof itm == 'object').map((item) => <Route path={item.path} element={<Layout>{item.element}</Layout>} />)
        }
      </Routes>
    }
    </BrowserRouter>
  )
}
const mapStateToProps = state => ({
  isLogin: state.userState.isLogin,
  client: state.userState.client
})
const mapDispatchToProps ={
  setUserStatus: userActions.setUserStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(CostumeRouter)
