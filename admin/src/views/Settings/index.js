import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import sceneActions from '../../redux/actions/Scenes'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { publicActions } from '../../redux/actions'

const SettingsPage = ({
    settingsList,
    totalSettings,
    settingInfo,
    deleteSetting,
    getSettings,
    getSettingInfo,
    putSetting,
    postSetting
}) => {
    const [modalOpened, setModalOpened] = useState(false)
    const [value, setValue] = useState({
        name: '',
        relatedModule: ''
    })

    useEffect(() => {
        getSettings()
    }, [])

    useEffect(() => {
        if(typeof modalOpened === 'string'){
            getSettingInfo(modalOpened)
        }
    }, [modalOpened])

    useEffect(() => {
        if(settingInfo?._id){
            setValue(
                {
                    name: settingInfo?.name,
                    relatedModule: settingInfo?.relatedModule
                }
            )
        }
    }, [settingInfo])


    const submitRequest = (e) => {
            e.preventDefault()
            try {
                if(typeof modalOpened === 'string'){
                    putSetting(value, modalOpened)
                    setModalOpened(false)
                    setValue({
                        name: '',
                        relatedModule: ''
                    })
                }else{
                    postSetting(value)
                    setModalOpened(false)
                    setValue({
                        name: '',
                        relatedModule: ''
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
        title={'افزودن / تغییر تنظیم'}>
        <form onSubmit={submitRequest} className='w-full'>
            <Input 
            
            placeholder={'نام'} className={'mb-2'} value={value.name} onChange={e => setValue({...value, name: e.target.value})} />
           
           <Input 
            
            placeholder={'ماژول مربوطه'} className={'mb-2'} value={value.relatedModule} onChange={e => setValue({...value, relatedModule: e.target.value})} />
           
            <Button className={'mt-5'}>ثبت اطلاعات</Button>
        </form>
    </Modal>
       }
    <h1 className='text-white text-2xl'>تنظیمات</h1>

    <List 
    addButtonTitle='افزودن تنظیمات جدید'
    addButtonOnClick={() => setModalOpened(true)}
    items={settingsList} cols={[
                {
                    title: 'شناسه',
                    properties: [['_id']]
                },
                {
                    title: 'نام',
                    properties: [['name']],
                },
                {
                    title: 'ماژول مربوطه',
                    properties: [['relatedModule']],
                    
                },
               
            ]} totals={totalSettings}
            
            config={{
                edit: (id) => setModalOpened(id),
                delete: async (id) => await deleteSetting(id)
            }}
            />
</div>
  )
}

const mapStateToProps = state => ({
    settingsList: state.publicState.settingsList,
    totalSettings: state.publicState.totalSettings,
    settingInfo: state.publicState.settingInfo,

})
const mapDispatchToProps = {
    getSettings: publicActions.getSettings,
    getSettingInfo: publicActions.getSettingInfo,
    postSetting: publicActions.postSetting,
    putSetting: publicActions.putSetting,
    deleteSetting: publicActions.deleteSetting,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)