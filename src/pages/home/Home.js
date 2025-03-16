import React from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Title from '../../components/title/Title';
import DropdownList from '../../components/dropdown/DropdownList';
import Status from '../../components/statuses/Status';
import TasksList from '../../components/tasks/TasksList';
// import { useLocation } from 'react-router-dom';

const Home = () => {
  // const location = useLocation();
  // const { taskData } = location.state || {}; // Access the passed state
  return (
    <>
      <Header />
      <Title />
      <DropdownList />
      <Status />
      <TasksList />
    </>
  );
};

export default Home;
