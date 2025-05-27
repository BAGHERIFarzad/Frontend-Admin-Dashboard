import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

export default function App() {
  const token = localStorage.getItem('token'); // ✅ Always up-to-date

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />

      <Route path="/login" element={<LoginPage onLogin={() => {
        localStorage.setItem('token', 'your-token'); // optional if not handled elsewhere
        window.location.href = '/dashboard'; // ✅ force reload
      }} />} />

      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

      <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
}
