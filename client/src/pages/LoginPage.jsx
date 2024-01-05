import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ error, setError] = useState()
    const [ response, setResponse] = useState()

    const loginEndpoint = ''
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;

    async function handleLogin(e) {
        e.preventDefault()
        setError(null)
        console.log(error)

        if (passwordRegex.test(password) == false) {
            setError({msg: 'Password must be between 8-16 characters \n must contain atleast, one letter, one number, one uppercase'})
            return
        }
        /*
        try {
            const res = await fetch(loginEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    email: email,
                    password: password
                })
            })

            setResponse(response.json())
            console.log(response)

        }
        catch(err){
            console.log(err.message)
            setError({msg: err.message})
            
        }
        finally{
            console.log("just finally")
        }
        */
    }

    console.log(error)
    
    return (
      <>
      <form className="body h-screen w-screen flex justify-center items-center" onSubmit={handleLogin}>
        <div className='form-body bg-slate-800 w-[450px] rounded-xl py-8 px-[40px] shadow-2xl'>
          <h4 className="text-slate-200 text-4xl text-center tracking-tight font-bold ">Login</h4>
          <p className='text-center text-lg text-gray-400 mb-10'>sign in to your account</p>

            {error?.msg && <p className='text-red-400 text-sm text-center mb-2'>{error.msg}</p>}
          <p className='text-slate-200 text-md font-semibold mb-[10px]'>Enter your email</p>
          <input required type="email" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="email" onChange={e => {setEmail(e.target.value)}}></input>
          
          <p className='text-slate-200 text-md font-semibold mb-[10px]'>Enter your password</p>
          <input required type="password" className="w-[100%] bg-slate-600 rounded-xl min-h-12 mb-8 px-[12px] text-white" placeholder="password" onChange={e => {setPassword(e.target.value)}}></input>
  
          <button type='' className='text-white bg-green-700 h-12 w-[100%] rounded-xl mb-[30px] hover:bg-green-600'>Sign-In</button>
          
          <p className='text-white text-center text-sm mb-3'>New here? <Link className='text-blue-400' to='/signup'>Register</Link></p>
        </div>
      </form>
        
      </>
    )
  }
  
  export default LoginPage
  