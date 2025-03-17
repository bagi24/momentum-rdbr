import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '../../assets/icons/Comments.png';
import './TasksList.css';

const TasksList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://momentum.redberryinternship.ge/api/tasks', {
          headers: {
            Authorization: 'Bearer 9e71b9d0-5849-4939-ae4d-2d4f0033bec3', // Add your token here
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = taskId => {
    navigate(`/task/${taskId}`);
  };

  // ✅ დეპარტამენტის პირველი სიტყვის ამოღება
  const getShortenedWord = (text, length = 5) => {
    const firstWord = text.trim().split(/\s+/)[0];
    return firstWord.length > length ? firstWord.slice(0, length) + '…' : firstWord;
  };

  // ✅ თარიღის ფორმატირება - "17 მარტ, 2025"
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date
      .toLocaleDateString('ka-GE', options)
      .replace('ი,', ',')
      .replace('January', 'იანვ,')
      .replace('February', 'თებე,')
      .replace('March', 'მარტ,')
      .replace('April', 'აპრი,')
      .replace('May', 'მაის,')
      .replace('June', 'ივნი,')
      .replace('July', 'ივლი,')
      .replace('August', 'აგვის,')
      .replace('September', 'სექტ,')
      .replace('October', 'ოქტო,')
      .replace('November', 'ნოემ,')
      .replace('December', 'დეკე,');
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='tasks-container'>
      {tasks.map(task => (
        <div key={task.id} className='task-card' onClick={() => handleTaskClick(task.id)}>
          <div className='task-meta'>
            <div className='priority-department'>
              <div className='priority'>
                <img src={task.priority.icon} alt='Priority Icon' />
                {task.priority.name}
              </div>
              <div className='department'>
                {getShortenedWord(task.department.name, 7)} (ID: {task.department.id})
              </div>
            </div>
            <div className='deadline'>{formatDate(task.due_date)}</div>
          </div>
          <div className='task-content'>
            <div className='taskList-title'>{task.name}</div>
            <div className='task-descriptions'>{task.description}</div>
          </div>
          <div className='task-footer'>
            <img src={task.employee.avatar} alt='Employee Avatar' className='employee-avatar' />
            <div className='comment-count-num'>
              <img src={CommentIcon} alt='Comment Icon' />
              <span>8</span>
              {/* {task.comments_count} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
