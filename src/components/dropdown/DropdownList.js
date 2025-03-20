import React, { useState, useEffect } from 'react';
import './DropdownList.css';
import Arrow from '../../assets/icons/arrow.png';
import ClickedArrow from '../../assets/icons/clickedArrow.png';
import { API_TOKEN } from '../../config/config';

console.log(API_TOKEN);

const DropdownList = ({ setSelectedFilters, selectedFilters }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setState, options = {}) => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(`მონაცემების ჩატვირთვის შეცდომა: ${url}`, error);
      }
    };

    fetchData('https://momentum.redberryinternship.ge/api/departments', setDepartments);
    fetchData('https://momentum.redberryinternship.ge/api/priorities', setPriorities);
    fetchData('https://momentum.redberryinternship.ge/api/employees', setEmployees, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  }, []);

  const toggleDropdown = name => {
    setOpenDropdowns(prev => {
      const isCurrentlyOpen = prev[name];
      return {
        department: false,
        priority: false,
        employee: false,
        [name]: !isCurrentlyOpen,
      };
    });
  };

  const handleSelection = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? '' : value,
    }));

    setOpenDropdowns(prev => ({
      ...prev,
      [category]: false,
    }));
  };

  const dropdowns = [
    { name: 'department', label: 'დეპარტამენტი', items: departments.map(dep => dep.name) },
    { name: 'priority', label: 'პრიორიტეტი', items: priorities.map(pri => pri.name) },
    {
      name: 'employee',
      label: 'თანამშრომელი',
      items: employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        surname: emp.surname,
        avatar: emp.avatar,
      })),
    },
  ];

  return (
    <div className='dropdown-container'>
      {dropdowns.map(dropdown => (
        <div key={dropdown.name} className='dropdown'>
          <div className='dropdown-header' onClick={() => toggleDropdown(dropdown.name)}>
            <p>
              {dropdown.label}{' '}
              <img
                className='arrow'
                src={openDropdowns[dropdown.name] ? ClickedArrow : Arrow}
                alt='arrow'
              />
            </p>
          </div>
          {openDropdowns[dropdown.name] && (
            <ul className='dropdown-items'>
              {dropdown.items.length > 0 ? (
                dropdown.items.map((item, index) => (
                  <li key={item.id || index}>
                    <input
                      type='checkbox'
                      id={item.id || item}
                      name={item.name || item}
                      checked={
                        dropdown.name === 'employee'
                          ? selectedFilters[dropdown.name]?.id === item.id
                          : selectedFilters[dropdown.name] === item
                      }
                      onChange={() => handleSelection(dropdown.name, item)}
                    />
                    <label htmlFor={item.id || item}>
                      {dropdown.name === 'employee' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={item.avatar}
                            alt=''
                            style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                          />
                          <span>
                            {item.name} {item.surname}
                          </span>
                        </div>
                      ) : (
                        item
                      )}
                    </label>
                  </li>
                ))
              ) : (
                <li>No items available</li>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownList;
