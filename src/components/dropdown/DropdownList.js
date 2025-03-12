import React, { useState, useEffect } from 'react';
import './DropdownList.css';
import Arrow from '../../assets/icons/arrow.png';
import ClickedArrow from '../../assets/icons/clickedArrow.png';

const DropdownList = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`მიღებული მონაცემები (${url}):`, data);
        setState(data);
      } catch (error) {
        console.error(`მონაცემების ჩატვირთვის შეცდომა: ${url}`, error);
      }
    };

    fetchData('https://momentum.redberryinternship.ge/api/departments', setDepartments);
    fetchData('https://momentum.redberryinternship.ge/api/priorities', setPriorities);
    fetchData('https://momentum.redberryinternship.ge/api/employees', setEmployees);
  }, []);

  const toggleDropdown = name => {
    console.log(`Clicked on: ${name}`);

    setOpenDropdowns(prev => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [name]: !prev[name],
    }));
  };

  const dropdowns = [
    { name: 'დეპარტამენტი', items: departments.map(dep => dep.name) },
    { name: 'პრიორიტეტი', items: priorities.map(pri => pri.name) },
    { name: 'თანამშრომელი', items: employees.map(emp => `${emp.first_name} ${emp.last_name}`) },
  ];

  console.log('Dropdowns data:', dropdowns); // Debugging

  return (
    <div className='dropdown-container'>
      {dropdowns.map(dropdown => (
        <div key={dropdown.name} className='dropdown'>
          <div className='dropdown-header' onClick={() => toggleDropdown(dropdown.name)}>
            <p>
              {dropdown.name}{' '}
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
                  <li key={index}>
                    <input type='checkbox' id={item} name={item} />
                    <label htmlFor={item}>{item}</label>
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
