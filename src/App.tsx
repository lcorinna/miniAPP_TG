import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import CreateEvent from './pages/CreateEvent';
// import RoleSelect from './pages/RoleSelect'; //рудимент? кажется уже отказался
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
        {/* <Route path="/role-select" element={<RoleSelect />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/admin" element={isAdmin() ? <AdminPage /> : <Navigate to="/" />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
