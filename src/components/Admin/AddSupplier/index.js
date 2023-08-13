import React, { useState, useRef } from 'react';
import './index.css'
import axios from 'axios';


const AddSupplier = ({setUpdateTable,isModalOpen,setIsModalOpen}) => {
  const form = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    fatherName: '',
    address: '',
    email: '',
    password: '',
    idcard: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (supplierForm.name.length < 3 || supplierForm.fatherName.length < 3) {
      alert('Name and father name must be at least 3 characters long');
      return;
    }

    if (!/^\d{13}$/.test(supplierForm.idcard)) {
      alert('CINC number must be a 13-digit number');
      return;
    }

    if (!/^03\d{9}$/.test(supplierForm.phoneNumber)) {
      alert('Number must be an 11-digit number starting with "03"');
      return;
    }

    try {
      await axios.post('https://alizaibuilders.com/suppliers/save', supplierForm);

      // Handle successful response

      setSupplierForm({
        name: '',
        fatherName: '',
        address: '',
        email: '',
        password: '',
        idcard: '',
        phoneNumber: '',
      })
      setUpdateTable('updated');
      setIsModalOpen(!isModalOpen);

       // Show the alert
       setShowAlert(true);

       // Hide the alert after 2 seconds
       setTimeout(() => {
         setShowAlert(false);
       }, 2000);
 
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }


  return (

    <>
      <form ref={form} onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' id='name' required placeholder='Name' value={supplierForm.name}
            onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='fatherName'>Father Name:</label>
          <input type='text' name='fatherName' required id='fatherName' placeholder='Father Name' value={supplierForm.fatherName} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='Address'>Address:</label>
          <input type='text' name='address' required id='address' placeholder='City, Town, House No' value={supplierForm.address} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' required id='email' placeholder='example@gmail.com' value={supplierForm.email} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' required id='password' placeholder='******' onChange={handleChange} value={supplierForm.password} />
        </div>
        <div className='form-group'>
          <label htmlFor='phoneNumber'>phone Number:</label>
          <input type='text' name='phoneNumber' required id='phoneNumber' placeholder='03000000000' value={supplierForm.phoneNumber}
            onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='idcard'>CNIC:</label>
          <input type='text' name="idcard" required
            id='idcard' placeholder='00000-0000000-0' onChange={handleChange} value={supplierForm.idcard} />
        </div>
        <button type="submit">Add Supplier</button>
      </form>
      {showAlert && (
        <div className="alert">
          <p>Supplier is Registered</p>
        </div>
      )}

    </>

  );
}

export default AddSupplier;
