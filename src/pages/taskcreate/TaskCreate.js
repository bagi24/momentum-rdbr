import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import ArrowDown from '../../assets/icons/arrow-down.png';
import CalendarIcon from '../../assets/icons/calendar-line.png';
import './TaskCreate.css';

const TaskCreate = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    assignee: '',
    priority: '',
    status: '',
    deadline: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('ახალი დავალება:', formData);
  };

  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState({ icon: null, name: '' });

  const handlePrioritySelect = ({ icon, name }) => {
    setSelectedPriority({ icon, name });
    setIsPriorityDropdownOpen(false);
  };

  useEffect(() => {
    fetch('https://momentum.redberryinternship.ge/api/departments')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));

    fetch('https://momentum.redberryinternship.ge/api/priorities')
      .then(response => response.json())
      .then(data => setPriorities(data))
      .catch(error => console.error('Error fetching priorities:', error));

    fetch('https://momentum.redberryinternship.ge/api/statuses')
      .then(response => response.json())
      .then(data => setStatuses(data))
      .catch(error => console.error('Error fetching statuses:', error));
  }, []);

  return (
    <>
      <Header />
      <span>შექმენი ახალი დავალება</span>
      <form className='task-create-form' onSubmit={handleSubmit}>
        <div className='line'>
          <label className='label-line-1'>
            <p> სათაური*</p>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
            />
            <div className='validation'>
              <div className='min-val'>
                <p> მინიმუმ 2 სიმბოლო</p>
              </div>
              <div className='max-val'>
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </label>
          <label>
            <p>დეპარტამენტი*</p>
            <select className='custom-selecte'>
              <option>აირჩიეთ დეპარტამენტი</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='line'>
          <label>
            <p> აღწერა</p>
            <textarea name='description' value={formData.description} onChange={handleChange} />
            <div className='validation'>
              <div className='min-val'>
                <p> მინიმუმ 2 სიმბოლო</p>
              </div>
              <div className='max-val'>
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </label>
          <label>
            <p>პასუხისმგებელი თანამშრომელი*</p>
            <select className='custom-selecte'>
              {employees.map(employe => (
                <option key={employe.id} value={employe.id}>
                  {employe.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='line'>
          <div className='left-3'>
            <div className='left-3-content'>
              <p>პრიორიტეტი *</p>
              <div className='custom-dropdown'>
                <div
                  className='dropdown-header'
                  onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}>
                  {selectedPriority.icon ? (
                    <>
                      <img
                        src={selectedPriority.icon}
                        alt='Priority Icon'
                        className='priority-icon'
                      />
                      <span>{selectedPriority.name}</span>
                    </>
                  ) : (
                    <>
                      <span>აირჩიეთ</span>
                    </>
                  )}
                  <img src={ArrowDown} alt='arrow-down' className='dropdown-arrow' />
                </div>
                {isPriorityDropdownOpen && (
                  <div className='dropdown-options'>
                    {priorities.map(priority => (
                      <div
                        key={priority.id}
                        className='dropdown-option'
                        onClick={() =>
                          handlePrioritySelect({ icon: priority.icon, name: priority.name })
                        }>
                        <img src={priority.icon} alt='' /> {priority.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <label>
              <p>სტატუსი*</p>
              <select name='status' value={formData.status} onChange={handleChange} required>
                <option value=''>აირჩიეთ</option>
                {statuses.map(status => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className='right-3'>
            <label className='date-picker-wrapper'>
              <p> დედლაინი</p>
              <div className='date-picker-container'>
                <img src={CalendarIcon} alt='Calendar Icon' className='calendar-icon' />
                <input
                  className='input-deadline'
                  type='text'
                  name='deadline'
                  placeholder='DD/MM/YYYY'
                  value={formData.deadline}
                  onChange={handleChange}
                  onFocus={e => (e.target.type = 'date')}
                  onBlur={e => (e.target.type = 'text')}
                />
              </div>
            </label>
          </div>
        </div>
        <div className='line-btn'>
          <button className='createTaskBtn' type='submit'>
            დავალების შექმნა
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskCreate;
