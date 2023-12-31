import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import sceneActions from '../../redux/actions/Scenes'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'

const CategoryPage = ({
    partCategoriesList,
    partCategoriesTotal,
    partCategoryInfo,
    deletePartCategory,
    getPartCategoriesList,
    getPartCategoryInfo,
    client,
    userData,
    getScenes,
    sceneList,
    putPartCategory,
    postPartCategory
}) => {
    const [modalOpened, setModalOpened] = useState(false)
    const [value, setValue] = useState({
        name: '',
        sceneId: ''
    })

    useEffect(() => {
        getPartCategoriesList()
        if(client){
            getScenes({clientId: userData?._id})
        }else{
            getScenes()
        }
    }, [client])

    useEffect(() => {
        if(typeof modalOpened === 'string'){
            getPartCategoryInfo(modalOpened)
        }
    }, [modalOpened])

    useEffect(() => {
        if(partCategoryInfo?._id){
            setValue(
                {
                    name: partCategoryInfo?.name,
                    sceneId: partCategoryInfo?.sceneId
                }
            )
        }
    }, [partCategoryInfo])


    const submitRequest = (e) => {
            e.preventDefault()
            try {
                if(typeof modalOpened === 'string'){
                    putPartCategory(value, modalOpened)
                    setModalOpened(false)
                    setValue({
                        name: '',
                        sceneId: ''
                    })
                }else{
                    postPartCategory(value)
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
        title={'افزودن / تغییر دسته بندی'}>
        <form onSubmit={submitRequest} className='w-full'>
            <Input 
            
            placeholder={'نام'} className={'mb-2'} value={value.name} onChange={e => setValue({...value, name: e.target.value})} />
            <Select 
            title={typeof modalOpened == 'string' ? partCategoryInfo?.sceneId?.name : 'انتخاب صحنه'}
            onChange={e => setValue({...value, sceneId: e})}
            items={sceneList} keyOfOptionList={[{properties: ['name']}, !client ?  {properties: ['clientId', 'name'], customText: '(مشتری)'} : false]} />
            <Button className={'mt-5'}>ثبت اطلاعات</Button>
        </form>
    </Modal>
       }
    <h1 className='text-white text-2xl'>دسته بندی ها</h1>

    <List 
    addButtonTitle='افزودن دسته بندی جدید'
    addButtonOnClick={() => setModalOpened(true)}
    items={partCategoriesList} cols={[
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
               
            ]} totals={partCategoriesTotal}
            
            config={{
                edit: (id) => setModalOpened(id),
                delete: async (id) => await deletePartCategory(id)
            }}
            />
</div>
  )
}

const mapStateToProps = state => ({
    partCategoriesList: state.sceneState.partCategoriesList,
    partCategoriesTotal: state.sceneState.partCategoriesTotal,
    partCategoryInfo: state.sceneState.partCategoryInfo,
    client: state.userState.client,
    userData: state.userState.userData,
    sceneList: state.sceneState.sceneList
})
const mapDispatchToProps = {
    getPartCategoriesList: sceneActions.getPartCategories,
    getPartCategoryInfo: sceneActions.getPartCategoryInfo,
    postPartCategory: sceneActions.postPartCategory,
    putPartCategory: sceneActions.putPartCategory,
    deletePartCategory: sceneActions.deletePartCategory,
    getScenes: sceneActions.getScenes
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)