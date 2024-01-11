import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import greenticklogo from '../assets/green_tick.png'
import redcrosslogo from '../assets/red_cross.png'

function MailVerified() {
    const params = useParams();
    const [response, setResponse] = useState();
    const [icon, setIcon] = useState();

    const backend_url = import.meta.env.VITE_APP_BACKEND_URL + "/user/verify/"  + params.id + "/" + params.uniqueString

    useEffect(() => {
        (async () => {
            try{
                let res = await fetch(backend_url)
                if (res.status >= 500) {
                    throw new Error ('500: Internal server error')
                }
                if (res.status >= 400){
                    setIcon(redcrosslogo)
                }
                else {
                    setIcon(greenticklogo)
                }
                let value = await res.json()
                setResponse(value.msg)
            }catch (e) {
                setResponse('internal server error')
                setIcon(redcrosslogo)
                return
            }finally {
                console.log('done')
            };
        })();  
    }, []);


    console.log(response)
    return (
        <>
            <div className="body h-screen w-screen flex justify-center items-center">
                <Toaster position='top-center'></Toaster>
                <div className='container bg-slate-800 w-[400px] rounded-xl py-5 px-[40px] shadow-2xl'>
                <img className='h-10 w-10 mx-auto my-5'  src ={icon} />
                    <h3 className="text-slate-200 text-xl text-center tracking-tight font-semibold mb-3">{response}</h3>
                    <p className='text-slate-200 text-center text-md mb-[10px]'>Click here to go to <Link to='/' className='text-blue-400'>login page</Link></p>
                    <p></p>
                </div>
            </div>
        </>
    )

}

export default MailVerified