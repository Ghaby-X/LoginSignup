import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailSentLogo from '../assets/email_sent.png'

function MailSent() {
    return (
      <>
        <div className='bodyContainer h-screen w-screen flex justify-center items-center'>
            <div className='form-body bg-slate-800 w-[600px] rounded-xl py-8 px-[40px] shadow-2xl'>
                <img className='h-16 w-16 mx-auto' src={emailSentLogo} alt='mailsent icon'/>
                <p className='text-slate-200 text-center text-md font-semibold mb-[10px]' >Mail sent successfully</p>
                <p className='text-slate-200 text-center text-md font-semibold mb-[10px]' >Click on the link sent to your inbox to verify your account</p>
            </div>
        </div>
      </>
    )
  }
  
  export default MailSent