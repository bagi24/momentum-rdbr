import React, { useState } from 'react';
import Header from '../../components/header/Header';
import './TaskCreate.css';

const TaskCreate = () => {
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

  return (
    <>
      <Header />
      <span>შექმენი ახალი დავალება</span>
      <form className='task-create-form' onSubmit={handleSubmit}>
        <div className='line'>
          <label>
            <p> სათაური*</p>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <p>დეპარტამენტი*</p>
            <input
              type='text'
              name='department'
              value={formData.department}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='line'>
          <label>
            <p> აღწერა</p>
            <textarea name='description' value={formData.description} onChange={handleChange} />
          </label>
          <label>
            <p>პასუხისმგებელი თანამშრომელი*</p>
            <input type='text' name='assignee' value={formData.assignee} onChange={handleChange} />
          </label>
        </div>
        <div className='line'>
          <div className='left-3'>
            <label>
              <p>პრიორიტეტი*</p>
              <select name='priority' value={formData.priority} onChange={handleChange} required>
                <option value=''>აირჩიეთ</option>
                <option value='low'>დაბალი</option>
                <option value='medium'>საშუალო</option>
                <option value='high'>მაღალი</option>
              </select>
            </label>
            <label>
              <p>სტატუსი*</p>
              <select name='status' value={formData.status} onChange={handleChange} required>
                <option value=''>აირჩიეთ</option>
                <option value='pending'>მომლოდინე</option>
                <option value='in_progress'>მიმდინარე</option>
                <option value='completed'>დასრულებული</option>
              </select>
            </label>
          </div>
          <div className='right-3'>
            <label>
              <p> დედლაინი</p>
              <input
                className='input-deadline'
                type='date'
                name='deadline'
                value={formData.deadline}
                onChange={handleChange}
              />
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
