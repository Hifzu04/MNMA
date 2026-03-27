import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'

function App() {


  return (

    <BrowserRouter>


      <Routes>

        <Route path='/' element={<UserLayout />}>
             <Route index element={<Home/>} />
               
             
        </Route>


        <Route>{/*admin route*/}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
