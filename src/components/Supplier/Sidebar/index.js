import React from 'react';
import { ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import './index.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { cleanToken } from '../../../API/token-service/token';

const Sidebar = () => {
  const iconSize = 20;
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className='side'>

        <NavLink className="sideLink" to={"/supplier/clients"} >
          <p >
            <span className='sideIcone'><HiUserGroup size={iconSize} /></span>
            <span className='txt'>clients</span>
          </p>
        </NavLink>
        <NavLink className="sideLink" to={"/supplier/addclient"} >
          <p>
            <span className='sideIcone'><ImUserTie size={iconSize} /></span>
            <span className='txt'>Add Client</span>
          </p>
        </NavLink>

      </div>
      <div className='logout' onClick={() => {
        cleanToken();
        navigate('/login');
      }}>
        <p>
          <span className='txt'>Logout</span>
          <span className='sideIcone'><MdOutlineLogout size={iconSize} /></span>
        </p>
      </div>
    </div>
  )
}

export default Sidebar;
