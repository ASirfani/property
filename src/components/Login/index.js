import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../API/Admin';
import { supplierLogin } from '../../API/Supplier';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const errorMsg = useState("Invalid username and password")



  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        email: email,
        password: password
      };

      let loginResponse;
      if (userType === 'admin') {
        const admin = {
          username: email,
          password: password
        };
        loginResponse = await adminLogin(admin);
        const { token, type } = loginResponse;
        const jwtJson = JSON.stringify({ type, token });
        localStorage.setItem('token', jwtJson);
        navigate('/admin');

      } else if (userType === 'supplier') {
        loginResponse = await supplierLogin(credentials);
        const { token, type } = loginResponse;
        const jwtJson = JSON.stringify({ type, token });
        localStorage.setItem('token', jwtJson);
        navigate('/supplier');
      }

      // Handle the successful login response, e.g., set state or perform additional actions

    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    }
  };
  return (
    <div className='imgBg'>
      <div className='colorBg'>
        <div className='login'>
          <h2>ALIZAI BUILDER<sup>&reg;</sup></h2>
          <form method='Post' onSubmit={handleLogin}>
            <input
              type='text'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@gmail.com'
            />
            <input
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder='*********'
            />
            <div className='option-user'>
              <div>
                <label htmlFor='admin'>
                  Admin
                </label>
                <input
                  type="radio"
                  value="admin"
                  name='admin'
                  checked={userType === 'admin'}
                  onChange={handleUserTypeChange}
                />

              </div>
              <div>
                <label htmlFor='supplier'>
                  Supplier
                </label>
                <input
                  type="radio"
                  value="supplier"
                  checked={userType === 'supplier'}
                  onChange={handleUserTypeChange}
                />
              </div>
            </div>

            <button className='loginbtn' type='submit'>Login</button>
          </form>

          {showAlert && (
            <div className="alertMsg">
              <p>{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
