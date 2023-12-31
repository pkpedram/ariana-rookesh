import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import clientsActions from '../../redux/actions/Clients'
import List from '../../components/List'
import { useNavigate } from 'react-router-dom'
import sceneActions from '../../redux/actions/Scenes'

const PartsPage = ({
    getPartList,
    partsList,
    partsTotal,
    deletePart,
    getScenes,
    client,
    userData,
    generatedParams,
    sceneList
}) => {
    const navigate = useNavigate()
    useEffect(() => {
        getPartList({}, generatedParams)
    }, [generatedParams])

    useEffect(() => {
        if(client){
            getScenes({}, {clientId: userData?._id})
        }else{
            getScenes()
        }
    }, [client])
  return (
    <div className='w-full'>
      
    <h1 className='text-white text-2xl'> آبجکت ها</h1>

    <List 
    addButtonTitle='افزودن آبجکت جدید'
    addButtonLink='/part/add'
    filters={[
        {
            title: 'صحنه',
            list: sceneList,
            keyOfOption: 'name',
            paramName: 'sceneId'
        }
    ]}
    items={partsList} cols={[
                {
                    title: 'شناسه',
                    properties: [['_id']]
                },
                {
                    title: 'نام',
                    properties: [['name']],
                },
                {
                    title: 'صحنه',
                    properties: [['sceneId', 'name']],
                    
                },
                {
                    title: 'دسته بندی',
                    properties: [['categoryId', 'name']],
                    
                },
               
            ]} totals={partsTotal}
            
            config={{
                edit: (id) => navigate(`/parts/${id}`),
                delete: async (id) => await deletePart(id)
            }}
            />
</div>
  )
}

const mapStateToProps = state => ({
    partsList: state.clientsState.partsList,
    partsTotal: state.clientsState.partsTotal,
    client: state.userState.client,
    userData: state.userState.userData,
    generatedParams: state.filterState.generatedParams,
    sceneList: state.sceneState.sceneList
})
const mapDispatchToProps = {
    getPartList: clientsActions.getPartList,
    deletePart: clientsActions.deletePart,
    getScenes: sceneActions.getScenes
}

export default connect(mapStateToProps, mapDispatchToProps)(PartsPage)