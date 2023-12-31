import React, { useState } from 'react'
import { connect } from 'react-redux'
import logo from '../../assets/icons/NoavLogo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import userActions from '../../redux/actions/User'

const LoginPage = ({login}) => {

    const [value, setValue] = useState({
        username: '',
        password: ''
    })

    const submitFunction = (e) => {
        e.preventDefault()
        login(value)
    }

  return (
    <div className='w-full h-screen bg-dark flex items-center justify-center'>
            <form
            onSubmit={submitFunction}
            className='p-6 rounded-xl border shadow-lg border-primary-500 bg-white/10 backdrop-blur-sm flex flex-col items-center'>
                <img src={logo} className='w-40' />

                <h1 className='text-white text-xl my-6'>ورود به پنل کاربری</h1>

                <Input value={value.username} onChange={e => setValue({...value, username: e.target.value})} placeholder={'نام کاربری'} className={'w-72 my-1'} />
                <Input value={value.password} onChange={e => setValue({...value, password: e.target.value})}  type={'password'} placeholder={'رمز عبور'} className={'w-72 my-1'} />
                <Button type={'submit'} className={'mt-1'}>ورود</Button>
            </form>
    </div>
  )
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    login: userActions.login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)