import { Outlet, Navigate } from 'react-router-dom';
import Dashboard from '../admin/Dashboard/Dashboard';

export const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return user && user.role === 1 ? (
    <div className="dashboard">
      <Dashboard />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};
