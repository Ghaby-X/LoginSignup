import { Link } from "react-router-dom" 

function Home() {

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center">
                <div className='bg-slate-800 w-[450px] rounded-xl py-8 px-[40px] shadow-2xl'>
                    <h1 className="text-center text-white text-2xl">Home page</h1>
                    <p className="text-white my-3">This is the Home page</p>
                    <p className="text-white">Click here to <Link className='text-blue-400' to='/login'>Login</Link></p>
                    <p className="text-white">Click here to <Link className='text-blue-400' to='/signup'>Register</Link></p>
                </div>
            </div>
        </>
    )
}

export default Home