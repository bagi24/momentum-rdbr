import React from 'react';
import XIcon from '../../assets/icons/x.png';
import './FilteredTitle.css';

const FilteredTitle = ({ selectedFilters, setSelectedFilters }) => {

  const handleRemoveFilter = filterKey => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: '', 
    }));
  };


  const handleClear = () => {
    setSelectedFilters({
      department: '',
      priority: '',
      employee: '',
    });
  };

  const isAnyFilterSelected =
    selectedFilters.department || selectedFilters.priority || selectedFilters.employee;

  return (
    <div className='filtered-tile'>
      {selectedFilters.department && (
        <div className='filter-item'>
          {selectedFilters.department}{' '}
          <img
            src={XIcon}
            alt=''
            onClick={() => handleRemoveFilter('department')} 
          />
        </div>
      )}
      {selectedFilters.priority && (
        <div className='filter-item'>
          {selectedFilters.priority}{' '}
          <img
            src={XIcon}
            alt=''
            onClick={() => handleRemoveFilter('priority')} 
          />
        </div>
      )}
      {selectedFilters.employee && (
        <div className='filter-item'>
          {selectedFilters.employee}{' '}
          <img
            src={XIcon}
            alt=''
            onClick={() => handleRemoveFilter('employee')}
          />
        </div>
      )}

    
      {isAnyFilterSelected && (
        <button className='filter-clear' onClick={handleClear}>
          გასუფთავება
        </button>
      )}
    </div>
  );
};

export default FilteredTitle;
