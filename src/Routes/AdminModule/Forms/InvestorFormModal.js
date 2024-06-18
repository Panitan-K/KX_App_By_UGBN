import React, { useState } from 'react';
import '../css/AdminModule.css';
function InvestorFormModal({ isOpen, onClose, onAddInvestor }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [balance, setBalance] = useState(150);
  const [imgSrc, setImgSrc] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvestor = {
      email,
      firstName,
      lastName,
      balance: Number(balance),
      imgSrc,
      ticketOwned: []
    };
    onAddInvestor(newInvestor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>Close here</span>
        <h2>Add Investor</h2>
        <form onSubmit={handleSubmit} className='Admin-Form'>
          <table className="AdminInput-form-table">
            <tbody>
              <tr>
                <td><label>Email</label></td>
                <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Organization</label></td>
                <td><input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>First Name</label></td>
                <td><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Last Name</label></td>
                <td><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Image URL</label></td>
                <td><input type="text" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Balance</label></td>
                <td><input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} required /></td>
              </tr>
              
              <tr>
                <td><label></label></td>
                <td> <button type="submit">Add Investor</button></td>
              </tr>
            </tbody>
          </table>
         
        </form>
      </div>
    </div>
  );
}

export default InvestorFormModal;
