import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
  
    return (
      <>
      <div class="body h-screen w-screen flex justify-center items-center">
        <div className='form-body bg-slate-800 w-[450px] rounded-3xl pt-2 px-[40px]'>
          <h4 className="text-slate-200 text-[50px] text-center font-bold">Login</h4>
          <p className='text-slate-200 text-center text-[20px] mb-[60px]'>sign into your account</p>
  
          <p className='text-slate-200 text-[20px] mb-[10px]'>Enter your email</p>
          <input type="text" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="email" onChange={e => {setEmail('e')}}></input>
          
          <p className='text-slate-200 text-[20px] mb-[10px]'>Enter your password</p>
          <input type="text" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="password" onChange={e => {setPassword('e')}}></input>
  
          <button className='text-white bg-green-700 h-12 w-[100%] rounded-xl mb-[30px]'>Sign-In</button>
          
          <p className='text-white text-center mb-3'>New here? Register</p>
        </div>
      </div>
        
      </>
    )
  }
  
  export default LoginPage
  