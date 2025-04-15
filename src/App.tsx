import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelect from './pages/RoleSelect';
import Dashboard from './pages/RoleSelect';

function App() {
  const role = localStorage.getItem('userRole');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={role ? '/dashboard' : '/role-select'} />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Здесь будут страницы: /event-form, /calendar и т.д. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
