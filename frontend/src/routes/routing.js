// routing.js

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserManagement from '../components/users';
import ChoreManagement from '../components/chores';

const Routing = () => {
  return (
    <Routes>
      <Route path="/users" element={<UserManagement />} />
      <Route path="/chores" element={<ChoreManagement />} />
      {/* Redirect to /chores by default */}
      <Route path="/" element={<Navigate to="/chores" />} />
    </Routes>
  );
};

export default Routing;
