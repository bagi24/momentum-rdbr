import React from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Title from '../../components/title/Title';
import DropdownList from '../../components/dropdown/DropdownList';
import Status from '../../components/statuses/Status';
import TasksList from '../../components/tasks/TasksList';

const Home = () => {
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
