import React from 'react';
import { useNavigate } from 'react-router-dom'; // დაამატეთ useNavigate
import './TasksList.css';

const TasksList = () => {
  const navigate = useNavigate(); // useNavigate ჰუკის გამოყენება

  const tasks = [
    { id: 1, title: 'პირველი დავალება', description: 'ეს არის პირველი დავალების აღწერა' },
    { id: 2, title: 'მეორე დავალება', description: 'ეს არის მეორე დავალების აღწერა' },
    { id: 3, title: 'მესამე დავალება', description: 'ეს არის მესამე დავალების აღწერა' },
    { id: 4, title: 'მეოთხე დავალება', description: 'ეს არის მეოთხე დავალების აღწერა' },
  ];

  const handleTaskClick = taskId => {
    navigate(`/task/${taskId}`); // გადასვლა SpecificTask გვერდზე taskId-ით
  };

  return (
    <div className='tasks-container'>
      {tasks.map(task => (
        <div
          key={task.id}
          className='task-card'
          onClick={() => handleTaskClick(task.id)} // დაჭერის დროს გადასვლა
        >
          <h3 className='task-title'>{task.title}</h3>
          <p className='task-description'>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
