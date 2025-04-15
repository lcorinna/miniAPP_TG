import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import Registration from './pages/Registration';
// import RoleSelect from './pages/RoleSelect'; //рудимент? кажется уже отказался
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import { isAdmin } from './utils/isAdmin';
import { getTelegramUser } from './api/telegram';
import EditProfile from './pages/EditProfile';

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
        <Route
          path="/admin"
          element={isAdmin() ? <AdminPage /> : <Navigate to="/" />}
        />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
