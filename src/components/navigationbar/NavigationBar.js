import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavigationBar.css'
import { FaUsers } from 'react-icons/fa'
import { FaUsersSlash } from 'react-icons/fa'
function NavigationBar() {
  const activeLink = {
    color: "#fbf9be",
    fontSize: "1.2rem",
    fontWeight: "bold"
  }
  const inactiveLink = {
    color: "#fbf9be",
    fontSize: "1.2rem"
  }
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <img src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png" alt="" width="40px" />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink
                }} to="users"><FaUsers className='users-icon' />Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink
                }} to="removed-users"><FaUsersSlash className='removed-users-icon' />Removed Users</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar