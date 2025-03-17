import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Hourglass.png';
import PlusMark from '../../assets/icons/add.png';
import CreateEmploye from '../employee/CreateEmploye';

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <header className='header-container'>
      <h1 className='logo' onClick={() => navigate('/')}>
        Momentum <img src={Logo} alt='Logo' />
      </h1>
      <div className='button-group'>
        <button className='btn primary' onClick={() => setShowModal(true)}>
          თანამშრომლის შექმნა
        </button>
        <button className='btn secondary' onClick={() => navigate('/createTask')}>
          <img src={PlusMark} alt='plusMark' /> შექმენი ახალი დავალება
        </button>
      </div>
      {showModal && <CreateEmploye onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Header;
