import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Resigter from './pages/Resigter.jsx'
import Profile from './pages/Profile.jsx'
import { Toaster } from 'sonner'; 


const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Resigter/>} />
      <Route path="profile" element={<Profile/>} />
      </Route>
      <Route>{/* Admin Layout */}</Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
