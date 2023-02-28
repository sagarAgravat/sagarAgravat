import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import PrivateRoutes from './Routes/PrivateRoutes'
import PublicRoutes from './Routes/PublicRoutes'

function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/auth' element={<PublicRoutes />}>
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
