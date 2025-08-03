import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout.jsx'
import Home from './pages/Home.jsx'
import { Toaster } from 'sonner'; 


const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      </Route>
      <Route>{/* Admin Layout */}</Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
