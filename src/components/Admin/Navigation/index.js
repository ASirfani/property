import React from 'react'
import './index.css'
import logo from '../../../image/logos.png';
import { BsBell } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa"
import {useNavigate } from 'react-router-dom';

const Navigation = ({name}) => {
  const navigate = useNavigate();
  return (
    <nav className="navigation">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
        <h3>Alizai Builder <sup>&reg;</sup></h3>
      </div>
      <div className="user-info">
        <span className="notification-icon">
          <BsBell />
        </span>
          <span className="username">{name}</span>
          <span className='userIcon' onClick={()=>{
            navigate('/admin/profile')}}><FaRegUserCircle /></span>

      </div>
    </nav>
  )
}

export default Navigation;
