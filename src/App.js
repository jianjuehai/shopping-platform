import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './router/index.js'
import CartDrawer from './components/CartDrawer'

export default function App(){
  return (
    <div className='app-container'>
      <Routes>
        {routes.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={route.element} 
          />
        ))}
      </Routes>
      <CartDrawer />
    </div>
  )
}