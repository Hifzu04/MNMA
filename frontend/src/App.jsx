import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import About from './Pages/About'
import MensSection from './Pages/MensSection'
import WomensSection from './Pages/WomensSection'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<UserLayout />}>

          <Route index element={<Home />} />

          <Route path='about' element={<About />} />
             <Route path='MensSection' element={<MensSection />} />
             <Route path='WomensSection' element={<WomensSection />} />

        </Route>

        {/* admin routes */}
        <Route />

      </Routes>

    </BrowserRouter>
  )
}

export default App