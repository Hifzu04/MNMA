import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import About from './Pages/About'
import MensSection from './Pages/MensSection'
import WomensSection from './Pages/WomensSection'
import Signuppage from './Pages/SignupPage.jsx'
import Signinpage from './Pages/SigninPage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import Profile from './Pages/Profile.jsx'
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<UserLayout />}>

          <Route index element={<Home />} />

          <Route path='about' element={<About />} />
             <Route path='MensSection' element={<MensSection />} />
             <Route path='WomensSection' element={<WomensSection />} />
             
              {/* need to render in protect route */}
               <Route path='SignupPage' element={<Signuppage />} />
                <Route path='SigninPage' element={<Signinpage />} />
                <Route path='CheckoutPage' element={<CheckoutPage />} />
                 <Route path='profile' element={<Profile />} />
        </Route>

        {/* admin routes */}
        <Route />

      </Routes>

    </BrowserRouter>
  )
}

export default App