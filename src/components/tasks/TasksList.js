import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '../../assets/icons/Comments.png';
import { API_TOKEN } from '../../config/config';
import './TasksList.css';

const TasksList = ({ appliedFilters }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsCount, setCommentsCount] = useState({});

  const colors = ['#f7bc30', '#FB5607', '#FF006E', '#3A86FF'];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://momentum.redberryinternship.ge/api/tasks', {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
        fetchCommentsCount(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const fetchCommentsCount = async tasks => {
    try {
      const promises = tasks.map(async task => {
        const response = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${task.id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          return { id: task.id, count: data.length };
        } else {
          console.error('Failed to fetch comments for task:', task.id);
          return { id: task.id, count: 0 };
        }
      });

      const results = await Promise.all(promises);
      const counts = results.reduce((acc, item) => {
        acc[item.id] = item.count;
        return acc;
      }, {});

      setCommentsCount(counts);
    } catch (error) {
      console.error('Error fetching comments count:', error);
    }
  };

  const handleTaskClick = task => {
    navigate(`/task/${task.id}`, { state: { task } });
  };

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
    return (
      <div className='loading-container'>
        <div className='loading-spinner'></div>
        <p className='loading-text'>იტვირთება...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='error-container'>
        <div className='error-icon'>❌</div>
        <p className='error-text'>Error: {error}</p>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => {
    const isDepartmentMatch =
      appliedFilters.department.length === 0 ||
      appliedFilters.department.includes(task.department.name);
    const isPriorityMatch =
      appliedFilters.priority.length === 0 || appliedFilters.priority.includes(task.priority.name);
    const isEmployeeMatch =
      appliedFilters.employee.length === 0 ||
      appliedFilters.employee.some(emp => emp.id === task.employee.id);

    return isDepartmentMatch && isPriorityMatch && isEmployeeMatch;
  });

  return (
    <div className='tasks-container'>
      {filteredTasks.map((task, index) => (
        <div
          key={task.id}
          className='task-card'
          onClick={() => handleTaskClick(task)}
          style={{ border: `1px solid ${colors[index % colors.length]}` }}>
          <div className='task-meta'>
            <div className='priority-department'>
              <div
                className='priority'
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
              <div
                className='department'
                style={{
                  backgroundColor:
                    task.department.name === 'ადმინისტრაციის დეპარტამენტი'
                      ? '#ff66a8'
                      : task.department.name === 'ადამიანური რესურსების დეპარტამენტი'
                      ? '#fd9a6a'
                      : task.department.name === 'ფინანსების დეპარტამენტი'
                      ? '#ffd86d'
                      : task.department.name === 'გაყიდვები და მარკეტინგის დეპარტამენტი'
                      ? '#89b6ff'
                      : task.department.name === 'ლოჯოსტიკის დეპარტამენტი'
                      ? '#08a508'
                      : task.department.name === 'ტექნოლოგიების დეპარტამენტი'
                      ? '#8338ec'
                      : task.department.name === 'მედიის დეპარტამენტი'
                      ? '#f7bc30'
                      : '#FFBE0B',
                  color: '#ffffff',
                }}>
                {getShortenedWord(task.department.name, 7)}
              </div>
            </div>
            <div className='deadline'>{formatDate(task.due_date)}</div>
          </div>
          <div className='task-content'>
            <div className='taskList-title'>{task.name}</div>
            <div className='task-descriptions'>{task.description}</div>
          </div>
          <div className='task-footer'>
            <img
              src={task.employee?.avatar || 'default-avatar-url'}
              alt='Employee Avatar'
              className='employee-avatar'
            />
            <div className='comment-count-num'>
              <img src={CommentIcon} alt='Comment Icon' />
              <span>{commentsCount[task.id] || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
