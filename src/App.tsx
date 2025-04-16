import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import AdminPanel from './pages/AdminPanel';
import AvailableEvents from './pages/AvailableEvents'; // импорт
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import EditEvent from './pages/EditEvent';
import EditProfile from './pages/EditProfile';
import MyEvents from './pages/MyEvents';
import Registration from './pages/Registration';
import { isAdmin } from './utils/isAdmin';

function App() {
  const role = localStorage.getItem('userRole'); //вернуть
  // const role = null; // заглушка
  // const profile = await api.getCurrentUser() // в последствии использовать это вместо role

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={role ? '/dashboard' : '/register'} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/admin" element={isAdmin() ? <AdminPage /> : <Navigate to="/" />} />
        <Route path="/admin/events" element={isAdmin() ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/available-events" element={<AvailableEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
