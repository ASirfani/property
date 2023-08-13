import React, { useEffect, useState } from 'react'
import './index.css'
import { getSupplier } from '../../../API/Supplier'
import { AiOutlinePlus } from "react-icons/ai";
import AddSupplier from '../AddSupplier/index'
import Modal from 'react-modal';


const Supplier = () => {
  const [updateTable,setUpdateTable] = useState('');
  const [supplierInfo, setSupplierInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSuppliersInfo = async () => {
    try {
      const clients = await getSupplier();
      setSupplierInfo(clients);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getSuppliersInfo();
  }, [])

  useEffect(() => {
    getSuppliersInfo();
  }, [updateTable])

  const openModal = () => {
    setIsModalOpen(true);
    setUpdateTable('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <table className="table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Father Name</th>
            <th>password</th>
            <th>CINC</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {supplierInfo.map((supplier, index) => (
            <tr key={supplier._id}>
              <td>{index + 1}</td>
              <td>{supplier.name}</td>
              <td>{supplier.fatherName}</td>
              <td>{supplier.password}</td>
              <td>{supplier.idcard}</td>
              <td>{supplier.address}</td>
              <td>{supplier.phoneNumber}</td>
              <td>{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='addSupplier' onClick={openModal}>
        <AiOutlinePlus size={40} color='#fff'/>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
     
        
        style={{
          content: {
            margin:'auto',
            height: '600px', 
            width: '400px', 
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#BEC3CB',
            borderRadius:'30px',
            border:'0px , solid #fff'
          }
        }}
        contentLabel="Selected Client Details">
        <div style={{ display: "inline", alignItems:'center',justifyContent:'center', }}>
          <h3   style={{textAlign:'center', marginBottom:'30px'}}>Add Supplier</h3>
          <AddSupplier setUpdateTable={setUpdateTable} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
      </Modal>

    </>
  )
}

export default Supplier
