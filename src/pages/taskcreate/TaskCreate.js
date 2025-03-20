import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import ArrowDown from '../../assets/icons/arrow-down.png';
import CalendarIcon from '../../assets/icons/calendar-line.png';
import { useNavigate } from 'react-router-dom';
import { API_TOKEN } from '../../config/config';
import './TaskCreate.css';

const TaskCreate = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [titleValidation, setTitleValidation] = useState({ minValid: false, maxValid: false });
  const [descriptionValidation, setDescriptionValidation] = useState({
    minValid: false,
    maxValid: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState({ id: null, icon: null, name: '' });

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    assignee: '',
    priority: '',
    status: '',
    deadline: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.department) {
      const filtered = employees.filter(
        employee => employee.department.id === parseInt(formData.department)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  }, [formData.department, employees]);

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));

    if (name === 'department') {
      const filtered = employees.filter(employee => employee.department.id === parseInt(value));
      setFilteredEmployees(filtered);
    }

    if (name === 'title') {
      setTitleValidation({
        minValid: value.length >= 2,
        maxValid: value.length <= 255,
      });
    }

    if (name === 'description') {
      setDescriptionValidation({
        minValid: value.length >= 2,
        maxValid: value.length <= 255,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!formData.department || !formData.assignee || !selectedPriority?.id || !formData.status) {
      console.log('Please fill all required fields');
      return;
    }

    const taskData = {
      name: formData.title,
      description: formData.description,
      due_date: formData.deadline,
      employee_id: formData.assignee,
      priority_id: selectedPriority.id,
      status_id: formData.status,
      department_id: formData.department,
    };

    try {
      const response = await fetch('https://momentum.redberryinternship.ge/api/tasks', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response from server:', errorResponse);
        throw new Error('Failed to create task');
      }

      const result = await response.json();
      console.log('Task created successfully:', result);
      navigate('/', { state: { taskData: result } });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePrioritySelect = priority => {
    setSelectedPriority(priority);
    setIsPriorityDropdownOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsRes, prioritiesRes, statusesRes, employeesRes] = await Promise.all([
          fetch('https://momentum.redberryinternship.ge/api/departments'),
          fetch('https://momentum.redberryinternship.ge/api/priorities'),
          fetch('https://momentum.redberryinternship.ge/api/statuses'),
          fetch('https://momentum.redberryinternship.ge/api/employees', {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }),
        ]);

        const [departments, priorities, statuses, employees] = await Promise.all([
          departmentsRes.json(),
          prioritiesRes.json(),
          statusesRes.json(),
          employeesRes.json(),
        ]);

        setDepartments(departments);
        setPriorities(priorities);
        setStatuses(statuses);
        setEmployees(employees);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1 className='headline'>შექმენი ახალი დავალება</h1>
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
              <div className={`min-val ${titleValidation.minValid ? 'valid' : ''}`}>
                <p> მინიმუმ 2 სიმბოლო</p>
              </div>
              <div className={`max-val ${titleValidation.maxValid ? 'valid' : ''}`}>
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </label>
          <label>
            <p>დეპარტამენტი*</p>
            <select
              name='department'
              value={formData.department}
              onChange={handleChange}
              className={`custom-selecte ${
                formSubmitted && !formData.department ? 'invalid-field' : ''
              }`}
              required>
              <option value=''>აირჩიეთ დეპარტამენტი</option>
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
              <div className={`min-val ${descriptionValidation.minValid ? 'valid' : ''}`}>
                <p> მინიმუმ 2 სიმბოლო</p>
              </div>
              <div className={`max-val ${descriptionValidation.maxValid ? 'valid' : ''}`}>
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </label>
          <label>
            <p>პასუხისმგებელი თანამშრომელი*</p>
            <select
              className='custom-selecte'
              name='assignee'
              value={formData.assignee}
              onChange={handleChange}
              disabled={!formData.department}
              required>
              <option value=''>აირჩიეთ თანამშრომელი</option>
              {filteredEmployees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} {employee.surname}
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
                        onClick={() => handlePrioritySelect(priority)}>
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
                  <option key={status.id} value={status.id}>
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
