import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'



function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
    const postURL = import.meta.env.VITE_APP_BACKEND_URL + '/user/signup'
    
    async function handleRegister(e) {
      e.preventDefault()

      if (passwordRegex.test(password) == false) {
          setError({msg: 'Password must be between 8-16 characters \n must contain atleast, one letter, one number, one uppercase'})
          return
      }

      try {
        setLoading(true)
        //sending a post request with email and password
        let res = await fetch(postURL, {
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
        let value = await res.json()
        //checking if error is from server or client
        if(!res.ok){
          if (res.status >= 500) {
            throw new Error ('500: Internal server error')
          }
          //if error is from client, set customized error
          setError(value)
          console.log(value)
        }else {
          navigate('/mailsent')
        }
      }
      catch (e) {
        console.log(e)
        return <><p>500: internal server error</p></>
      }finally {
        setLoading(false)
      }
    }

    if(loading){
      toast('loading...')
    }else{
      toast.dismiss()
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
          
          <p className='text-white text-center text-sm mb-3'>Already a user? <Link className='text-blue-400' to='/'>Login</Link></p>
        </div>
      </form>
        
      </>
    )
  }
  
  export default SignupPage
  