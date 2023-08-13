/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const AdminLayout = () => {
  const navigate = useNavigate()
  const [username,setUsername] = useState();

  const check = async (id, name) => {
    try {
      const response = await axios.post('https://alizaibuilders.com/supplier/check', {
        id: id,
        name: name,
      });
      const data = response.data;
      if (!data.success) {
        navigate('/*');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      navigate('/login');
      return;
    } else {
      const decodedToken = jwt_decode(tokenString);
      setUsername(decodedToken.name)
      check(decodedToken.id, decodedToken.name);
    }
  },[]);


  return (
    <div className="admin">
      <header>
        <Navigation name={username} />
      </header>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

