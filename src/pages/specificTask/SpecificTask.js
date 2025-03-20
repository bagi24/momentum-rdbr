import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import StatusIcon from '../../assets/icons/pie-chart.png';
import EmployeIcon from '../../assets/icons/Frame 1000005864.png';
import CalendarIcon from '../../assets/icons/calendar.png';
import CommentSection from '../../components/comments/CommentSection';
import { API_TOKEN } from '../../config/config';
import './SpecificTask.css';

function SpecificTask() {
  const location = useLocation();
  const task = location.state?.task;

  const [statuses, setStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(task?.status.id || '');

  useEffect(() => {
    fetch('https://momentum.redberryinternship.ge/api/statuses')
      .then(response => response.json())
      .then(data => setStatuses(data))
      .catch(error => console.error('Error fetching statuses:', error));
  }, []);

  useEffect(() => {
    if (selectedStatusId && selectedStatusId !== task.status.id) {
      updateTaskStatus(task.id, selectedStatusId);
    }
  }, [selectedStatusId]);

  const updateTaskStatus = async (taskId, statusId) => {
    try {
      const response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ status_id: statusId }),
      });

      if (response.ok) {
        console.log('Task status updated successfully!');
        alert('სტატუსი წარმატებით განახლდა!');
      } else {
        console.error('Failed to update task status:', await response.text());
        alert('სტატუსის განახლება ვერ მოხერხდა. გთხოვთ, სცადოთ ხელახლა.');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('მოხდა შეცდომა სტატუსის განახლებისას.');
    }
  };

  const handleStatusChange = e => {
    const newStatusId = e.target.value;
    setSelectedStatusId(newStatusId);
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  const getShortenedWord = text => {
    switch (text.trim()) {
      case 'ადმინისტრაციის დეპარტამენტი':
        return 'ადმინისტრ.';
      case 'ადამიანური რესურსების დეპარტამენტი':
        return 'ად.რესურსი';
      case 'ფინანსების დეპარტამენტი':
        return 'ფინანსები';
      case 'გაყიდვები და მარკეტინგის დეპარტამენტი':
        return 'მარკეტინგი';
      case 'ლოჯისტიკის დეპარტამენტი':
        return 'ლოჯისტიკა';
      case 'ტექნოლოგიების დეპარტამენტი':
        return 'ინფ.ტექ.';
      case 'მედიის დეპარტამენტი':
        return 'მედია';
      default:
        const firstWord = text.trim().split(/\s+/)[0];
        return firstWord.length > 5 ? firstWord.slice(0, 5) + '…' : firstWord;
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const weekdays = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
    const weekdayIndex = date.getDay();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${weekdays[weekdayIndex]} - ${day}/${month}/${year}`;
  };

  return (
    <>
      <Header />
      <div className='specificTask-content'>
        <div className='task-info'>
          <div className='filteredIcons'>
            <div
              className='filterStatus'
              style={{
                color:
                  task.priority.name === 'დაბალი'
                    ? '#08A508'
                    : task.priority.name === 'საშუალო'
                    ? '#FFBE0B'
                    : task.priority.name === 'მაღალი'
                    ? '#FA4D4D'
                    : '#FFBE0B',
                border:
                  task.priority.name === 'დაბალი'
                    ? '0.5px solid #08A508'
                    : task.priority.name === 'საშუალო'
                    ? '0.5px solid #FFBE0B'
                    : task.priority.name === 'მაღალი'
                    ? '0.5px solid #FA4D4D'
                    : '0.5px solid #FFBE0B',
              }}>
              <img src={task.priority.icon} alt='Priority Icon' />
              {task.priority.name}
            </div>
            <div className='filteredDepart'> {getShortenedWord(task.department.name, 7)}</div>
          </div>
          <div className='info-con'>
            <div className='task-title'>{task.name}</div>
            <div className='task-description'>
              <p className='desc-text'>{task.description}</p>
            </div>
            <div className='task-detalies'>
              <span className='task-detalies-title'>დავალების დეტალები</span>
              <div className='task-detalie-info'>
                <div className='task-status-text'>
                  <img src={StatusIcon} alt='' /> სტატუსი
                </div>
                <div className='task-status-api'>
                  <select
                    name='status'
                    value={selectedStatusId}
                    onChange={handleStatusChange}
                    required>
                    {statuses.map(status => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='employee'>
                <div className='task-status-text'>
                  <img src={EmployeIcon} alt='' /> თანამშრომელი
                </div>
                <div className='employee-profile'>
                  <img className='employe-avatar' src={task.employee.avatar} alt='User' />
                  <div className='employe-name'>
                    <p className='dep'>{task.department.name}</p>
                    <p className='user-name'>
                      {task.employee.name} {task.employee.surname}
                    </p>
                  </div>
                </div>
              </div>
              <div className='deadline'>
                <div className='task-status-text'>
                  <img src={CalendarIcon} alt='' /> დავალების ვადა
                </div>
                <div className='deadline-result'>{formatDate(task.due_date)}</div>
              </div>
            </div>
          </div>
        </div>
        <CommentSection taskId={task.id} /> {/* გადაეცემა task.id როგორც რიცხვი */}
      </div>
    </>
  );
}

export default SpecificTask;
