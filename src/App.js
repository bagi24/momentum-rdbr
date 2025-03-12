import './App.css';
import Home from './pages/home/Home';
import TaskCreate from './pages/taskcreate/TaskCreate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createTask' element={<TaskCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
