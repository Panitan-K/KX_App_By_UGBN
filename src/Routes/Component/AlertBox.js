// AlertBox.js
import React from 'react';
import styles from './css/AlertBox.module.css'; // Import the CSS module

const AlertBox = ({ alertTopic, alertContent, onClose }) => {
  return (
    <div className={styles.alertOverlay}>
      <div className={styles.alertBox}>
        <div className={styles.alertHeader}>{alertTopic}</div>
        <div className={styles.alertBody}>{alertContent}</div>
        <button onClick={onClose} className={styles.alertCloseButton}>OK</button>
      </div>
    </div>
  );
};

export default AlertBox;
