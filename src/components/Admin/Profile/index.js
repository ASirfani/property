import React, { useEffect, useState } from 'react';
import './index.css';
import { getToken, cleanToken } from '../../../API/token-service/token';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [adminId, setAdminId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      setAdminId(decodedToken.id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and repassword match
    if (password !== repassword) {
      console.log('Passwords do not match');
      return;
    }

    // Check if the username is a non-empty string
    if (!username || typeof username !== 'string') {
      alert('Invalid username')
      return;
    }

    // Check if the password has at least 6 characters
    if (password.length < 6) {
      alert('Password must have at least 6 characters')
      return;
    }

    // Create an object with the updated admin data
    const updatedAdmin = {
      username,
      password,
    };

    try {
      // Make the update request to the server
      await axios.put(`/admin/${adminId}`, updatedAdmin);
      alert('Update is successful');
      cleanToken();
      navigate('/login');
    } catch (error) {
      console.log('Error updating admin:', error.message);
    }
  };

  return (
    <div className="profile-contianer">
      <div className="profile-form">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Profile update</legend>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="*****"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Re-password"
              name="repassword"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              required
            />
            <input type="submit" value="Update" />
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Profile
