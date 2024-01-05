import { useState } from "react"
import { Navigate } from "react-router-dom"



function DashboardPage(){
    const [error, setError] = useState()
    const [ response, setResponse] = useState()

    const logoutURI = 'localhost:4001/logout'
    async function handleLogout(e) {
        e.preventDefault()

        try {
            res = await fetch(logoutURI, {
                method:'POST'
            })
        }
        catch(e){
            setError(e)
            console.log(e)
            return
        }

        <Navigate to='/'></Navigate>

    }

    return (
        <>
            <div className="max-w-[800px] w-[70%] px-5 border-8 mx-auto">
                <h1 className="text-center text-4xl font-semibold my-4">Dashboard</h1>
                <div className='h-0.5 w-[70%]  bg-black mx-auto'></div>


                <p className="my-5">Welcome to the dashboard page</p>
                {error && <p className="text-red-700">Watch your code, there is an error somewhere</p>}

                <button className="bg-gray-300 p-3 rounded-md text-right mb-3 hover:bg-gray-200" onClick={handleLogout}>Logout</button>
            </div>
            
        </>
    )
}

export default DashboardPage