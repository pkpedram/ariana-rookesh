import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import List from '../../components/List'
import { useNavigate } from 'react-router-dom'
import userActions from '../../redux/actions/User'

const UsersPage = ({
    getUsersList,
    usersList,
    totalUsers,
    generatedParams
}) => {
    const navigate = useNavigate()
    useEffect(() => {
        getUsersList({}, generatedParams)
    }, [generatedParams])


  return (
    <div className='w-full'>
      
    <h1 className='text-white text-2xl'> کاربر ها</h1>

    <List 
    addButtonTitle='افزودن کاربر جدید'
    addButtonLink='/user/add'
    // filters={[
    //     {
    //         title: 'صحنه',
    //         list: sceneList,
    //         keyOfOption: 'name',
    //         paramName: 'sceneId'
    //     }
    // ]}
    items={usersList} 
    cols={[
               
                {
                    title: 'نام کاربری',
                    properties: [['username']],
                },
                {
                    title: 'ایمیل',
                    properties: [['email']],
                    
                },
                {
                    title: 'نقش',
                    properties: [['role']],
                    
                },
                
               
            ]} totals={totalUsers}
            
            config={{
                edit: (id) => navigate(`/users/${id}`),
                delete: async (id) => id
            }}
            />
</div>
  )
}

const mapStateToProps = state => ({
    usersList: state.userState.usersList,
    totalUsers: state.userState.totalUsers ,
    generatedParams: state.filterState.generatedParams
})
const mapDispatchToProps = {
    getUsersList: userActions.getUsersList
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)