/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { AiOutlineCompass } from "react-icons/ai";
import { ImUserTie } from "react-icons/im";
import { CgMail } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { getClients } from '../../../API/Clients'
import { MyContext } from '../../Context/MyContext';
import { cleanToken } from '../../../API/token-service/token';

const Sidebar = () => {
  const iconSize = 20;
  const navigate = useNavigate();
  const { amount, setAmount } = useContext(MyContext);



  const fetchClients = async () => {
    try {
      const clients = await getClients(); // Assuming getClients() returns an array of clients
      const pendingClients = clients.filter(client => client.role === 'pending');
      setAmount(pendingClients.length);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="sidebar">
      <div className='side'>

        <NavLink className="sideLink" to={'/admin/dashbord'}>
          <p>
            <span className='sideIcone'><AiOutlineCompass size={iconSize} /></span>
            <span className='txt'>Dashbord</span>
          </p>
        </NavLink>
        <NavLink className="sideLink" to={"/admin/notification"} >
          <p>
            <span className='sideIcone'><CgMail size={iconSize} /></span>
            <span className='txt'>Notification</span>
          </p>
          {amount ?
            <span className='notification'>{amount}</span> : ''}
        </NavLink>
        <NavLink className="sideLink" to={"/admin/supplier"} >
          <p>
            <span className='sideIcone'><ImUserTie size={iconSize} /></span>
            <span className='txt'>Supplier</span>
          </p>
        </NavLink>
        <NavLink className="sideLink" to={"/admin/clients"} >
          <p >
            <span className='sideIcone'><HiUserGroup size={iconSize} /></span>
            <span className='txt'>clients</span>
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
