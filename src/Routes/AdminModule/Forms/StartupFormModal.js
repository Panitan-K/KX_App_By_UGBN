import React, { useState } from 'react';
import '../css/AdminModule.css';

function StartupFormModal({ isOpen, onClose, onAddStartup }) {
  const [StartupName, setStartupName] = useState('');
  const [Industry, setIndustry] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [Stage, setStage] = useState('');
  const [productSrc, setproductSrc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStartup = {
      fundRaised:0,
      startupName : StartupName ,
      imgSrc,
      productSrc,
      ticketOwned: [],
      industry: Industry, 
      stage: Stage, 
    };
    onAddStartup(newStartup);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>Close here</span>
        <h2>Startup</h2>
        <form onSubmit={handleSubmit} className='Admin-Form'>
          <table className="AdminInput-form-table">
            <tbody>
              <tr>
                <td><label>Startup Name</label></td>
                <td><input type="text" value={StartupName} onChange={(e) => setStartupName(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Startup industry</label></td>
                <td><input type="text" value={Industry} onChange={(e) => setIndustry(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Startup Stage</label></td>
                <td><input type="text" value={Stage} onChange={(e) => setStage(e.target.value)} required /></td>
              </tr>
          
              <tr>
                <td><label>Image URL</label></td>
                <td><input type="text" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Product Image URL</label></td>
                <td><input type="text" value={productSrc} onChange={(e) => setproductSrc(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label></label></td>
                <td> <button type="submit">Add Startup</button></td>
              </tr>
            </tbody>
          </table>
         
        </form>
      </div>
    </div>
  );
}

export default StartupFormModal;
