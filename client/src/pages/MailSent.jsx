import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import email_sent_icon from '../assets/email_sent.png'
function MailSent() {
    return (
        <>
            <div className="body h-screen w-screen flex justify-center items-center">
                <div className='form-body bg-slate-800 w-[600px] rounded-xl py-5 px-[40px] shadow-2xl'>
                <img className='h-20 w-15 mx-auto my-1'  src ={email_sent_icon} />
                    <h3 className="text-slate-200 text-xl text-center tracking-tight font-semibold mb-3">VERIFICATION EMAIL SENT</h3>
                    <p className='text-slate-200 text-center text-md  mb-[10px]'>Click on the link sent to your inbox to verify your mail</p>
                    <p className='text-slate-200 text-center text-sm mb-[10px]'>Note: If email is not in your inbox, check your spam folder</p>
                    <p></p>
                </div>
            </div>
        </>
    )

}

export default MailSent