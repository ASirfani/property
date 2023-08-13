import React, { useEffect, useState } from 'react'
import './index.css'
import { getClients } from '../../../API/Clients/index'
import MoneyReceipt from '../PrintRecipe';
import Modal from 'react-modal';

const Clients = () => {
  const [clientsInfo, setClientInfo] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);




  const getAllClients = async () => {

    try {
      const clients = await getClients();
      setClientInfo(clients)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllClients()
  }, [])

  const openModal = () => {
    setIsModalOpen(true);
    console.log(selectedClient);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const splitDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };


  // filter by date not show yesterday clients
  const today = new Date().toLocaleDateString();

  const todayRegisteredClients = clientsInfo.filter(
    (client) => splitDateTime(client.date).date === today
  );


  return (
    <>
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
          {todayRegisteredClients.map((client, index) => (
            <tr key={client._id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.fatherName}</td>
              <td>{client.idCard}</td>
              <td>{client.address}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.serialNumber}</td>
              <td>{splitDateTime(client.date).date}</td>
              <td>Rs.{client.bookingFee}</td>
              <td>{client.houseNumber}</td>
              <td>
                <button className="approve-button" onClick={() => {
                  openModal();
                  setSelectedClient(client);
                }}>
                  Print
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Client Details">
        {selectedClient && (<div style={{ display: 'flex' }}>
          <MoneyReceipt receiptData={selectedClient} />

          <MoneyReceipt receiptData={selectedClient} />
        </div>
        )}

      </Modal>

    </>
  )

}


export default Clients
