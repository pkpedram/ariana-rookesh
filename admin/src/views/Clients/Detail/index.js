import { connect } from 'react-redux'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import clientsActions from '../../../redux/actions/Clients'
import Input from '../../../components/Input'
import ImageInput from '../../../components/ImageInput'
import Button from '../../../components/Button'
import {BiEditAlt} from 'react-icons/bi'

const ClientsEditPage = ({getClientInfo, clientInfo, client, editClient, postClient}) => {
    const { id } = useParams()
    const [value, setValue] = useState({
        domain: '',
        name: '',
        password: '',
        background: null,
        logo: null
    })

    useMemo(() => getClientInfo(id), [id])

    const changeVal = e => setValue({...value, [e.target.name]: e.target.value})

    useEffect(() => {
      
        if(clientInfo?._id){
            setValue({
                domain: clientInfo.domain,
                name: clientInfo.name,
                background: clientInfo.background,
                logo: clientInfo.logo
            })
        }
    }, [clientInfo])

    const submitRequest = async (e) => {
        e.preventDefault()
        let keys = Object.keys(value)
        let formData = new FormData()
        keys.map(item => formData.append(item, value[item]))
        if(id){
            await editClient(formData, clientInfo?._id, client)
        }else{
            formData.append('seenNumber', 0)
            formData.append('features', [])
           await postClient(formData)
        }

    }

  return (
    <div className={`bg-gray-900 p-8 rounded-lg shadow-xl w-full`}>
        <form onSubmit={submitRequest}>
            <h1 className='text-xl text-white'>{client ? 'تنظیمات اصلی' : (id ? 'اطلاعات مشتری' + ' ' + id : 'افزودن مشتری جدید')}</h1>
            <div className='mt-8 w-full flex items-center gap-4'>
                <Input name={'name'} value={value.name} onChange={changeVal}  placeholder={'نام...'} />
                <Input name={'domain'} value={value.domain} onChange={changeVal} placeholder={'دامنه'} />
                <Input type={'password'} name={'password'} value={value.password} onChange={changeVal} placeholder={'پسورد جدید...'} />
                
            </div>
            <div className='w-full flex  gap-6  my-8'>
            <ImageInput title={'بک گراند'} 
            id={'client_bg'}
            name={'background'} 
            deleteFile={() => setValue({...value, background: null})}
            value={value.background} onChange={e => setValue({...value, [e.target.name]: e.target.files[0]})} />
                 <ImageInput title={'لوگو'} 
            id={'client_logo'}
            name={'logo'} 
            deleteFile={() => setValue({...value, logo: null})}
            value={value.logo} onChange={e => setValue({...value, [e.target.name]: e.target.files[0]})} />
                
            </div>
            <div className='w-full flex items-center justify-end'>
                <Button className={'!w-max px-6'}>
                    <p><BiEditAlt /></p>
                    <p>ثبت تغییرات</p>
                </Button>
                </div>
        </form>
    </div>
  )
}

const mapStateToProps = state => ({
    clientInfo: state.clientsState.clientInfo,
    client: state.userState.client
})
const mapDispatchToProps = {
    getClientInfo: clientsActions.getClientInfo,
    editClient: clientsActions.editClient,
    postClient: clientsActions.postClient
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsEditPage)