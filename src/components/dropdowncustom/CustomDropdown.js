import React, { useState } from 'react';
import Icon from '../../assets/icons/Frame 1000006008.png';
import './CustomDropdown.css';

const CustomDropdown = ({ options, value, onChange, disabled, showModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = option => {
    setSelectedOption(option);
    onChange({ target: { name: 'assignee', value: option.id } });
    setIsOpen(false);
  };

  return (
    <div className='custom-selecte'>
      <div
        className='dropdown-header'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ opacity: disabled ? 0.3 : 1 }}>
        {selectedOption ? (
          <div className='selected-option'>
            <img src={selectedOption.avatar} alt='' className='avatar' />
            <span>
              {selectedOption.name} {selectedOption.surname}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
      {isOpen && (
        <div className='dropdown-options'>
          <div
            className='dropdown-option add-employee'
            onClick={() => {
              showModal();
              setIsOpen(false);
            }}>
            <img src={Icon} alt='icon' />
            დაამატე თანამშრომელი
          </div>
          {options.map(option => (
            <div key={option.id} className='dropdown-option' onClick={() => handleSelect(option)}>
              <img src={option.avatar} alt='' className='avatar' />
              <span>
                {option.name} {option.surname}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
