import React, { useState } from 'react';

function InvestorFormModal({ isOpen, onClose, onAddInvestor }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [balance, setBalance] = useState(0);
  const [imgSrc, setImgSrc] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvestor = {
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
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Investor</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>
            Email:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
            </div>
          
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </label>
          <label>
            Balance:
            <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} required />
          </label>
          <label>
            Image URL:
            <input type="text" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} required />
          </label>
    
          <button type="submit">Add Investor</button>
        </form>
      </div>
    </div>
  );
}

export default InvestorFormModal;
