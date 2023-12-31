import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import sceneActions from '../../redux/actions/Scenes'
import List from '../../components/List'
import { useNavigate } from 'react-router-dom'
import clientsActions from '../../redux/actions/Clients'

const ClientsPage = ({getClients, clientsList, deleteClient, clientsTotal}) => {
    const navigate = useNavigate()
    useEffect(() => {
        getClients()
    }, [])

  return (
    <div className='w-full'>
        <h1 className='text-white text-2xl'>مشتری ها</h1>

        <List 
        addButtonTitle='افزودن مشتری جدید'
        addButtonLink='/clients/add'
        items={clientsList} cols={[
                    {
                        title: 'شناسه',
                        properties: [['_id']]
                    },
                    {
                        title: 'نام',
                        properties: [['name']],
                    },
                    {
                        title: 'دامنه',
                        properties: [['domain']],
                        
                    },
                    {
                        title: 'تعداد کل بازدید',
                        properties: [['seenNumber']],
                        
                    },
                ]} totals={clientsTotal}
                
                config={{
                    edit: (id) => navigate(`/client/${id}`),
                    delete: async (id) => await deleteClient(id)
                }}
                />
    </div>
  )
}

const mapStateToProps = state => ({
    clientsList: state.clientsState.clientsList,
    clientsTotal: state.clientsState.clientsTotal
})
const mapDispatchToProps = {
    getClients: clientsActions.getClients,
    deleteClient: clientsActions.deleteClient
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage)