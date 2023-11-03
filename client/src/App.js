// src/App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Manager_page/Dashboard';
import EmployeeManagement from './components/Emploee/EmployeeManagement';
import Login from './components/log_in/Login';
import Profile from './components/general_pages/Profile';
import EmployeeProfile from './components/Emploee/EmployeeProfile';

function App() {
  // const [activePage, setActivePage] = useState('dashboard');

  // const handleMenuClick = (page) => {
  //   setActivePage(page);
  // };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" exact element={<EmployeeManagement />} />
          <Route path="/employee/:id" element={<EmployeeProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
