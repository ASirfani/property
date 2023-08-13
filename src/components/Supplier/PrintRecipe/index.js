import React from 'react';
import './index.css';
import {convertAmountToWords} from '../AmountConverter/amountConverter'


const MoneyReceipt = ({receiptData}) => {
  const receiptDatas = {
    byCash: 'Yes',
    companyName: 'Alpha Property',
    companyAddress: '123 Main St, Islamabad, Pakistan',
    companyPhoneNumber: '051000123',
    companyEmail: 'alphaproperty@info.com',
  };
  const {
    name,
    phoneNumber,
    bookingFee,
    date,
    serialNumber
  } = receiptData;

  const splitDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };


  

  return (
    <div className="money-receipt">
      <div className="header">
        <h2>{receiptDatas.companyName}</h2>
        <p>{receiptDatas.companyAddress}</p>
        <p>Phone: {receiptDatas.companyPhoneNumber}</p>
        <p>Email: {receiptDatas.companyEmail}</p>
        <hr />
      </div>
      <div className="content">
        <h3>Money Receipt</h3>
        <table>
          <tbody>
            <tr>
              <td>Serial No:</td>
              <td>{serialNumber}</td>
            </tr>
            <tr>
              <td>Received from:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>By cash:</td>
              <td>{receiptDatas.byCash}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{splitDateTime(date).date}</td>
            </tr>
            <tr>
              <td>Contact No:</td>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <td>Amount in word :</td>
              <td>{convertAmountToWords(bookingFee)} rupees</td>
            </tr>
            <tr>
              <td>Amount:</td>
              <td>Rs.{bookingFee}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="footer">
        <hr />
        <p>Thank you for your payment.</p>
      </div>
    </div>
  );
};

export default MoneyReceipt;
