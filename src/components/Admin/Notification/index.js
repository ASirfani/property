/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { getClients , updateClient } from '../../../API/Clients'
import {MyContext} from '../../Context/MyContext';


const Notification = () => {

  const [clientsInfo, setClientsInfo] = useState([]);
  const { amount, setAmount } = useContext(MyContext);

  const getClientsInfo = async () => {

    try {
      const clients = await getClients();
      setClientsInfo(clients);
    } catch (error) {
      console.log(error)
    }
  }

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
    getClientsInfo();
  }, [])
  
  useEffect(() => {
    getClientsInfo();
    fetchClients();
  }, [amount])

  const splitDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  const handleApprove = async (client) => {
    try {
      // Update the role to 'approved'
      const updatedClient = { ...client, role: 'approved' };
      const response = await updateClient(client._id, updatedClient);
      // If the server successfully updates the client role, update the state
      if (response) {
        const updatedClients = clientsInfo.map((c) =>
          c._id === updatedClient._id ? updatedClient : c
        );
        setClientsInfo(updatedClients);
        setAmount(updatedClients.length); 

      }
    } catch (error) {
      console.log(error);
    }
  };
 

  const pendingClients = clientsInfo.filter((client) => client.role === 'pending');


  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Father name</th>
          <th>CINC</th>
          <th>Address</th>
          <th>Number  </th>
          <th>Serial num</th>
          <th>Date</th>
          <th>Booking fee</th>
          <th>House NO</th>
          <th>Role</th>
          
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {pendingClients.map((client,index) => (
          <tr key={client._id}>
            <td>{index+1}</td>
            <td>{client.name}</td>
            <td>{client.fatherName}</td>
            <td>{client.idCard}</td>
            <td>{client.address}</td>
            <td>{client.phoneNumber}</td>
            <td>{client.serialNumber}</td>
            <td>{splitDateTime(client.date).date}</td>
            <td>{client.bookingFee}</td>
            <td>{client.houseNumber}</td>
            <td>{client.role}</td>
            <td><button className='approve-button' onClick={() => handleApprove(client)}><strong>Appove</strong></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Notification
