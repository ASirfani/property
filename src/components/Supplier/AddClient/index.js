import React, { useRef, useState } from 'react';
import './index.css';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const AddClient = () => {
  const form = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    address: '',
    idCard: '',
    phoneNumber: '',
    bookingFee: '',
    houseNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.name.length < 3 || formData.fatherName.length < 3) {
      alert('Name and father name must be at least 3 characters long');
      return;
    }

    if (!/^\d{13}$/.test(formData.idCard)) {
      alert('CINC number must be a 13-digit number');
      return;
    }

    if (!/^03\d{9}$/.test(formData.phoneNumber)) {
      alert('Number must be an 11-digit number starting with "03"');
      return;
    }

    if (parseFloat(formData.bookingFee) <= 0 || isNaN(parseFloat(formData.bookingFee))) {
      alert('Booking fee must be a positive number');
      return;
    }

    try {
      await axios.post('https://alizaibuilders.com/clients/save', formData);

      // sent msg to email
      emailjs.sendForm('service_280zd2g', 'template_steaaf9', form.current, 'Agq2Dn3kudKdBj_6R')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  
      

      // Clear the form fields
      setFormData({
        name: '',
        fatherName: '',
        address: '',
        idCard: '',
        phoneNumber: '',
        bookingFee: '',
        houseNumber: '',
      });

      // Show the alert
      setShowAlert(true);

      // Hide the alert after 2 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);

    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="add-client-container">
      <h2>Add Client</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            required
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fatherName">Father's Name:</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            required
            placeholder="Father Name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            required
            placeholder="City, Town, House No"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idCard">CINC:</label>
          <input
            type="text"
            id="idCard"
            name="idCard"
            value={formData.idCard}
            required
            placeholder="00000-0000000-0"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            required
            placeholder="03000000000"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookingFee">Booking Fee:</label>
          <input
            type="text"
            id="bookingFee"
            name="bookingFee"
            value={formData.bookingFee}
            required
            placeholder="Rs.10000"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseNumber">House No:</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            required
            placeholder="House No"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='approve-button'>Submit</button>
      </form>

      {showAlert && (
        <div className="alert">
          <p>Client is Registered</p>
        </div>
      )}
      
    </div>
  );
};

export default AddClient;

 
