import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import sceneActions from '../../redux/actions/Scenes'
import List from '../../components/List'
import { useNavigate } from 'react-router-dom'

const ScenesPage = ({getScenes, sceneList, deleteScene, sceneTotal, userData, client}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(client && userData?._id){
            getScenes({}, {clientId: userData?._id})
        }else{
            getScenes()
        }
    }, [client])

  return (
    <div className='w-full'>
        <h1 className='text-white text-2xl'>صحنه ها</h1>

        <List 
        addButtonTitle='افزودن صحنه جدید'
        addButtonLink='/scene/add'
        items={sceneList} cols={[
                    {
                        title: 'شناسه',
                        properties: [['_id']]
                    },
                    {
                        title: 'نام',
                        properties: [['name']],
                    },
                   !client && {
                        title: 'مشتری',
                        properties: [['clientId', 'name']],
                        
                    },
                    client && {
                        title: 'توضیحات',
                        properties: [['description']]
                    }
                ]} totals={sceneTotal}
                
                config={{
                    edit: (id) => navigate(`/scenes/${id}`),
                    delete: async (id) => await deleteScene(id)
                }}
                />
    </div>
  )
}

const mapStateToProps = state => ({
    sceneList: state.sceneState.sceneList,
    sceneTotal: state.sceneState.sceneTotal,
    userData: state.userState.userData,
    client: state.userState.client
})
const mapDispatchToProps = {
    getScenes: sceneActions.getScenes,
    deleteScene: sceneActions.deleteScene
}

export default connect(mapStateToProps, mapDispatchToProps)(ScenesPage)