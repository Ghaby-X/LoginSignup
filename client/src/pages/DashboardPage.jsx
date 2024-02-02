import { useNavigate } from "react-router-dom"
import { logout } from '../Api/authApi'
import axios from '../config/axiosConfig'


function DashboardPage(){
    const navigate = useNavigate()
    const logoutURI = import.meta.env.VITE_APP_BACKEND_URL + '/user/logout'

    //function to handle logout logic
    async function handleLogout(e) {
        e.preventDefault()
        try{
            let response = await axios.post(logoutURI)
            console.log('logged out successfully')
            setTimeout(() => {
                navigate('/login')
            }, 500)
        }catch(error) {
           console.log('Error logging out')
           console.log(error)
        }
        

    }


    return (
        <>
            <div className="body h-screen w-screen justify-center items-center flex">
                <div className="max-w-[800px] w-[70%] px-5 bg-slate-800 border-8 mx-auto">
                    <h1 className="text-center text-4xl font-semibold my-4 text-white">Dashboard</h1>
                    <div className='h-0.5 w-[70%]  bg-white mx-auto'></div>


                    <p className="my-5 text-white">Welcome to the dashboard page</p>
                    <p className="my-5 text-white">This is a protected page and you are not able to access it without signing up and login in</p>

                    <button className="bg-gray-300 p-3 rounded-md text-right mb-3 hover:bg-gray-200" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
            
        </>
    )
}

export default DashboardPage