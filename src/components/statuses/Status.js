import React, { useEffect, useState } from 'react';
import './Status.css';

const Status = () => {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch('https://momentum.redberryinternship.ge/api/statuses')
      .then(response => response.json())
      .then(data => setStatuses(data))
      .catch(error => {
        console.error('მონაცემების მოპოვების შეცდომა:', error);
      });
  }, []);

  return (
    <div className='status-container'>
      {statuses.map((status, index) => (
        <button key={status.id} className={`status-button status-${index % 4}`}>
          {status.name}
        </button>
      ))}
    </div>
  );
};

export default Status;
