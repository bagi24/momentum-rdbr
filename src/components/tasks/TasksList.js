import React from 'react';
import './TasksList.css';

const TasksList = () => {
  const tasks = [
    { id: 1, title: 'პირველი დავალება', description: 'ეს არის პირველი დავალების აღწერა' },
    { id: 2, title: 'მეორე დავალება', description: 'ეს არის მეორე დავალების აღწერა' },
    { id: 3, title: 'მესამე დავალება', description: 'ეს არის მესამე დავალების აღწერა' },
    { id: 4, title: 'მეოთხე დავალება', description: 'ეს არის მეოთხე დავალების აღწერა' },
  ];

  return (
    <div className='tasks-container'>
      {tasks.map(task => (
        <div key={task.id} className='task-card'>
          <h3 className='task-title'>{task.title}</h3>
          <p className='task-description'>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
