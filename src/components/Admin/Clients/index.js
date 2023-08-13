import React, { useEffect, useState } from 'react'
import './index.css'
import { getClients } from '../../../API/Clients'
const Clients = () => {

  const [clientsInfo, setClientsInfo] = useState([]);


  // get all client from server
  const getClientsInfo = async () => {
    try {
      const clients = await getClients();
      setClientsInfo(clients);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getClientsInfo();
  }, [])

  // diplay formate "day/month/year"
  const splitDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  //filter the client by role
  const approvedClients = clientsInfo.filter((client) => client.role === 'approved');
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {approvedClients.map((client, index) => (
          <tr key={client._id}>
            <td>{index + 1}</td>
            <td>{client.name}</td>
            <td>{client.fatherName}</td>
            <td>{client.idCard}</td>
            <td>{client.address}</td>
            <td>{client.phoneNumber}</td>
            <td>{client.serialNumber}</td>
            <td>{splitDateTime(client.date).date}</td>
            <td>{client.bookingFee}</td>
            <td>{client.houseNumber}</td>
            <td><strong>Approved</strong></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Clients
