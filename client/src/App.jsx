import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState('Login')
  const [pageText, setPageText] = useState('sign into your account')
  const [email, setEmail] = useState('')

  return (
    <>
    <div class="body h-screen w-screen flex justify-center items-center">
      <div className='form-body bg-slate-800 w-[500px] rounded-3xl pt-2 px-[40px]'>
        <h4 className="text-slate-200 text-[30px] text-center font-bold">{page}</h4>
        <p className='text-slate-200 text-center text-[15px] mb-[60px]'>{pageText}</p>
        <input type="text" className="w-[100%] bg-slate-600 rounded-xl min-h-14 mb-12" onChange={e => {setEmail('e')}}></input>
        

      </div>
    </div>
      
    </>
  )
}

export default App
