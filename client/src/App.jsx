import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from './pages/Home'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import MailSent from "./pages/MailSent"
import MailVerified from "./pages/MailVerified"
import RequireAuth from "./wrapper/RequireAuth"

function App() {
  return(
    <Routes>
      <Route path = '/' element= {<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element = {<SignupPage/>} />
      <Route path='/mailsent' element = {<MailSent/>} />
      <Route path='/mailverification/:id/:uniqueString' element = {<MailVerified/>} />
      <Route path='/dashboard' element = {
        <RequireAuth>
          <DashboardPage/>
        </RequireAuth>
        
      } />
    </Routes>
  )
}

export default App
