import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState()
    const [msg, setMsg] = useState()
    const [loading, setLoading] = useState()

    const loginEndpoint = import.meta.env.VITE_APP_BACKEND_URL + '/user/login'
    const navigate = useNavigate()
    
    async function handleLogin(e) {
      e.preventDefault()
      try{
        setLoading(true)
        let result = await fetch(loginEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: new URLSearchParams(
            {
              email: email,
              password: password
            }
        )
        })
        console.log(result)

        let value = await result.json()
        console.log(value)
        
        if (result.ok){
          console.log('Login successful: ' + value.msg)
          setStatus(1)
        } else {
          console.log('Login failed: ', value.msg)
          setStatus(0)
        }
      }
      catch(err) {
        console.log(err)
        return <><p>500: internal server error</p></>
      }
      finally{
        setLoading(false)
        if (status == 1){ toast.success(msg) }
        if (status == 0){ toast.error(msg) }
        setTimeout(() => {
          setStatus()
          setMsg()
        }, 4000)
      }
  }
 

  if(loading){
    toast('loading...')
  }
  console.log('status: ', status)
  console.log('msg ', msg)


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
  