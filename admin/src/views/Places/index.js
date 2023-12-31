import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import sceneActions from '../../redux/actions/Scenes'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'

const ScenesPage = ({
    placeList,
    totalPlaces,
    placeInfo,
    deletePlace,
    getPlaces,
    getPlaceInfo,
    client,
    userData,
    getScenes,
    sceneList,
    putPlace,
    postPlace
}) => {
    const [modalOpened, setModalOpened] = useState(false)
    const [value, setValue] = useState({
        name: '',
        sceneId: ''
    })

    useEffect(() => {
        getPlaces()
        if(client){
            getScenes({clientId: userData?._id})
        }else{
            getScenes()
        }
    }, [client])

    useEffect(() => {
        if(typeof modalOpened === 'string'){
            getPlaceInfo(modalOpened)
        }
    }, [modalOpened])

    useEffect(() => {
        if(placeInfo?._id){
            setValue(
                {
                    name: placeInfo?.name,
                    sceneId: placeInfo?.sceneId
                }
            )
        }
    }, [placeInfo])


    const submitRequest = (e) => {
            e.preventDefault()
            try {
                if(typeof modalOpened === 'string'){
                    putPlace(value, modalOpened)
                    setModalOpened(false)
                    setValue({
                        name: '',
                        sceneId: ''
                    })
                }else{
                    postPlace(value)
                    setModalOpened(false)
                    setValue({
                        name: '',
                        sceneId: ''
                    })
                }
            } catch (error) {
                console.error(error)
            }
    }   



  return (
    <div className='w-full'>
       {
        modalOpened &&  <Modal 
        closeModal={() => {setModalOpened(false);  setValue({
            name: '',
            sceneId: ''
        })}}
        title={'افزودن / تغییر مکان'}>
        <form onSubmit={submitRequest} className='w-full'>
            <Input 
            
            placeholder={'نام'} className={'mb-2'} value={value.name} onChange={e => setValue({...value, name: e.target.value})} />
            <Select 
            title={typeof modalOpened == 'string' ? placeInfo?.sceneId?.name : 'انتخاب صحنه'}
            onChange={e => setValue({...value, sceneId: e})}
            items={sceneList} keyOfOptionList={[{properties: ['name']}, !client ?  {properties: ['clientId', 'name'], customText: '(مشتری)'} : false]} />
            <Button className={'mt-5'}>ثبت اطلاعات</Button>
        </form>
    </Modal>
       }
    <h1 className='text-white text-2xl'> مکان ها</h1>

    <List 
    addButtonTitle='افزودن مکان جدید'
    addButtonOnClick={() => setModalOpened(true)}
    items={placeList} cols={[
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
               
            ]} totals={totalPlaces}
            
            config={{
                edit: (id) => setModalOpened(id),
                delete: async (id) => await deletePlace(id)
            }}
            />
</div>
  )
}

const mapStateToProps = state => ({
    placeList: state.sceneState.placeList,
    totalPlaces: state.sceneState.totalPlaces,
    placeInfo: state.sceneState.placeInfo,
    client: state.userState.client,
    userData: state.userState.userData,
    sceneList: state.sceneState.sceneList
})
const mapDispatchToProps = {
    getPlaces: sceneActions.getPlaces,
    getPlaceInfo: sceneActions.getPlaceInfo,
    postPlace: sceneActions.postPlace,
    putPlace: sceneActions.putPlace,
    deletePlace: sceneActions.deletePlace,
    getScenes: sceneActions.getScenes
}

export default connect(mapStateToProps, mapDispatchToProps)(ScenesPage)