import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import axios from '../config/axiosConfig'



function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
    const signUpEndpoint = import.meta.env.VITE_APP_BACKEND_URL + '/user/signup'
    
    async function handleRegister(e) {
      e.preventDefault()

      if (passwordRegex.test(password) == false) {
          setError({msg: 'Password must be between 8-16 characters \n must contain atleast, one letter, one number, one uppercase'})
          return
      }
      let data = {
        email: email,
        password: password
      }
      try {
        setLoading(true)
        let response = await axios.post(signUpEndpoint, data)
        navigate('/mailsent')
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
      toast('loading...', { id: 'clipboard' })
    }

    return (
      <>
      <form className="body h-screen w-screen flex justify-center items-center" onSubmit={handleRegister}>
        <div className='form-body bg-slate-800 w-[450px] rounded-xl py-8 px-[40px] shadow-2xl'>
          <h4 className="text-slate-200 text-4xl text-center tracking-tight font-bold">Sign Up</h4>
          <p className='text-center text-lg text-gray-400 mb-10'>create an account</p>
          {error?.msg && <p className='text-red-400 text-sm text-center mb-2'>{error.msg}</p>}
          <p className='text-slate-200 text-md  font-semibold mb-[10px]'>Enter your email</p>
          <input required type="email" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="email" onChange={e => {setEmail(e.target.value)}}></input>
          
          <Toaster position='top-center'></Toaster>

          <p className='text-slate-200 text-md font-semibold mb-[10px]'>Enter your password</p>
          <input required type="password" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="password" onChange={e => {setPassword(e.target.value)}}></input>
  
          <button type='submit' className='text-white bg-green-700 h-12 w-[100%] rounded-xl mb-[30px] hover:bg-green-600'>Register</button>
          
          <p className='text-white text-center text-sm mb-3'>Already a user? <Link className='text-blue-400' to='/login'>Login</Link></p>
        </div>
      </form>
        
      </>
    )
  }
  
  export default SignupPage
  