import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import greenTickLogo from '../assets/green_tick.png'
import redCrossLogo from '../assets/red_cross.png'

function MailVerified() {
    const { id, uniqueString } = useParams()
    const backend_url = import.meta.env.VITE_APP_BACKEND_URL + '/user/verify/' + id + '/' + uniqueString;
    const [icon, setIcon] = useState();
    const [msg, setMsg] = useState();

    useEffect(() => {
        (async () => {
            try {
                let result = await(fetch(backend_url))
                console.log(result.status)
                if (result.status >= 500){
                    throw new Error()
                }

                console.log(result.status)
                if (result.status >= 400){
                    setIcon(redCrossLogo)
                }
                else {
                    setIcon(greenTickLogo)
                }

                const res = await result.json()
                console.log(res)
                setMsg(res.msg)
            }
            catch(e){
                console.log(e)
                setIcon(redCrossLogo)
                setMsg("Internal Server Error")
            }
        })();
    }, [])

    return (
      <>
        <div className='bodyContainer h-screen w-screen flex justify-center items-center'>
            <div className='form-body bg-slate-800 w-[600px] rounded-xl py-8 px-[40px] shadow-2xl'>
                <img className='h-16 w-16 mx-auto' src={icon} alt='mailsent icon'/>
                <p className='text-slate-200 text-center text-md font-semibold mb-[10px]' >{msg}</p>
                <p className='text-slate-200 text-center text-md font-semibold mb-[10px]' >Click here to go to <Link className='text-blue-500' to='/'>login page</Link></p>
            </div>
        </div>
      </>
    )
  }
  
  export default MailVerified