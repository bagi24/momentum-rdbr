import './App.css';
import Home from './pages/home/Home';
import TaskCreate from './pages/taskcreate/TaskCreate';
import SpecificTask from './pages/specificTask/SpecificTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createTask' element={<TaskCreate />} />
          <Route path='/task/:taskId' element={<SpecificTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
