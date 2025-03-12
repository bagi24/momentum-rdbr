import React from 'react';
import './Header.css';
import Logo from '../../assets/images/Hourglass.png';
import PlusMark from '../../assets/icons/add.png';

const Header = () => {
  return (
    <header className='header-container'>
      <h1 className='logo'>
        Momentum <img src={Logo} alt='Logo' />
      </h1>
      <div className='button-group'>
        <button className='btn primary'>თანამშრომლის შექმნა</button>
        <button className='btn secondary'>
          <img src={PlusMark} alt='plusMark' /> შექმენი ახალი დავალება
        </button>
      </div>
    </header>
  );
};

export default Header;
