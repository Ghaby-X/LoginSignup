import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../config/axiosConfig'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState()
  const navigate = useNavigate()

  const loginEndpoint = import.meta.env.VITE_APP_BACKEND_URL + '/user/login'
  
  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    //logging user in
    let data = {
      email: email,
      password: password
    }
    
    try {
      let response = await axios.post(loginEndpoint, data)
      toast.success(response.data.msg, { id: 'clipboard' })
      console.log('logged in successfully')
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    }
    catch(error) {
      console.log('Error logging in')
      error.response.data ? toast.error(error.response.data.msg, { id: 'clipboard' }) : console.log(error)
    }
    finally {
      setLoading(false)
    }
 
}
 

  if(loading){
    toast('loading...', {id: 'clipboard'})
  }

  return (
  <>
  <form className="body h-screen w-screen flex justify-center items-center" onSubmit={handleLogin}>
    <div className='form-body bg-slate-800 w-[450px] rounded-xl py-8 px-[40px] shadow-2xl'>
      <h4 className="text-slate-200 text-4xl text-center tracking-tight font-bold ">Login</h4>
      <p className='text-center text-lg text-gray-400 mb-10'>sign in to your account</p>

      <p className='text-slate-200 text-md font-semibold mb-[10px]'>Enter your email</p>
      <input required type="email" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="email" onChange={e => {setEmail(e.target.value)}}></input>
      
      <p className='text-slate-200 text-md font-semibold mb-[10px]'>Enter your password</p>
      <Toaster position='top-center'></Toaster>
      <input required type="password" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="password" onChange={e => {setPassword(e.target.value)}}></input>

      <button type='submit' className='text-white bg-green-700 h-12 w-[100%] rounded-xl mb-[30px] hover:bg-green-600'>Sign-In</button>
      
      <p className='text-white text-center text-sm mb-3'>New here? <Link className='text-blue-400' to='/signup'>Register</Link></p>
    </div>
  </form>
    
  </>
   )
}
  
export default LoginPage
  