import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
          <h3 className='task-title'>{task.name}</h3>{' '}
          {/* Use `task.name` instead of `task.title` */}
          <p className='task-description'>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
