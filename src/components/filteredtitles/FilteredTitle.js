import React from 'react';
import XIcon from '../../assets/icons/x.png';
import './FilteredTitle.css';

const FilteredTitle = ({
  selectedFilters,
  setSelectedFilters,
  handleApplyFilters,
  setAppliedFilters,
}) => {
  const handleRemoveFilter = (filterKey, value) => {
    const updatedFilters = {
      ...selectedFilters,
      [filterKey]: selectedFilters[filterKey].filter(item => item !== value),
    };

    setSelectedFilters(updatedFilters);
    setAppliedFilters(updatedFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      department: [],
      priority: [],
      employee: [],
    };
    setSelectedFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const isAnyFilterSelected =
    selectedFilters.department.length > 0 ||
    selectedFilters.priority.length > 0 ||
    selectedFilters.employee.length > 0;

  return (
    <div className='filtered-tile'>
      {selectedFilters.department.map((dept, index) => (
        <div key={index} className='filter-item'>
          {dept} <img src={XIcon} alt='' onClick={() => handleRemoveFilter('department', dept)} />
        </div>
      ))}
      {selectedFilters.priority.map((prio, index) => (
        <div key={index} className='filter-item'>
          {prio} <img src={XIcon} alt='' onClick={() => handleRemoveFilter('priority', prio)} />
        </div>
      ))}
      {selectedFilters.employee.map((emp, index) => (
        <div key={index} className='filter-item'>
          {emp.name} {emp.surname}{' '}
          <img src={XIcon} alt='' onClick={() => handleRemoveFilter('employee', emp)} />
        </div>
      ))}

      {isAnyFilterSelected && (
        <button className='filter-clear' onClick={handleClear}>
          გასუფთავება
        </button>
      )}
    </div>
  );
};

export default FilteredTitle;
