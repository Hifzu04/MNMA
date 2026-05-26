import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import { Toaster } from "sonner"
import About from './Pages/About'
import MensSection from './Pages/MensSection'
import WomensSection from './Pages/WomensSection'

function App() {

  return (
    <BrowserRouter>
      <Toaster position='top-right' />

      <Routes>

        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='MensSection' element={<MensSection />} />
          <Route path='WomensSection' element={<WomensSection />} />

        </Route>
        <Route>{/*admin route*/}</Route>


      </Routes>

    </BrowserRouter>
  )
}

export default App