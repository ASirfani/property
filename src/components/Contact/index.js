import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './index.css'

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_280zd2g', 'template_steaaf9', form.current, 'Agq2Dn3kudKdBj_6R')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="client" />
      <label>Email</label>
      <input type="email" name="supplier" />
      
      <input type="submit" value="Send" />
    </form>
  );
};