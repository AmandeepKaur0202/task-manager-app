import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TasksList from './pages/TasksList';
import TaskDetails from './pages/TasksDetails';
import TaskEdit from './pages/TasksEdit';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TasksList />} />
      <Route path="/tasks/:id" element={<TaskDetails />} />
      <Route path="/tasks/edit/:id" element={<TaskEdit />} />
    </Routes>
  </Router>
);

export default App;
