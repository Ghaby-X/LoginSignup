import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import MailSent from "./pages/MailSent"
import MailVerified from "./pages/MailVerified"

function App() {
  return(
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element = {<SignupPage/>} />
      <Route path='/mailsent' element = {<MailSent />} />
      <Route path='/mailverification/:id/:uniqueString' element = {<MailVerified />} />
      <Route path='/dashboard' element = {<DashboardPage/>} />
    </Routes>
  )
}

export default App
