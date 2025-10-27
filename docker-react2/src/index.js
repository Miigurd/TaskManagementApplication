import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import TaskView from './TaskView';
import TaskForm from './TaskForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:taskId" element={<TaskView />} />
        <Route path="/add-task" element={<TaskForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);