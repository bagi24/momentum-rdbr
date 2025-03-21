import React from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Title from '../../components/title/Title';
import DropdownList from '../../components/dropdown/DropdownList';
import Status from '../../components/statuses/Status';
import TasksList from '../../components/tasks/TasksList';
import FilteredTitle from '../../components/filteredtitles/FilteredTitle';
import { useState } from 'react';

const Home = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    department: [],
    priority: [],
    employee: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    department: [],
    priority: [],
    employee: [],
  });

  const handleApplyFilters = () => {
    setAppliedFilters(selectedFilters);
  };

  return (
    <>
      <Header />
      <Title />
      <DropdownList
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        handleApplyFilters={handleApplyFilters}
      />
      <FilteredTitle
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        handleApplyFilters={handleApplyFilters}
        setAppliedFilters={setAppliedFilters}
      />
      <Status />
      <TasksList appliedFilters={appliedFilters} />
    </>
  );
};

export default Home;
