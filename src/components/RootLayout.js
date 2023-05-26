import React from 'react'
import NavigationBar from './navigationbar/NavigationBar'
import { Outlet } from 'react-router-dom';
function RootLayout() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout;