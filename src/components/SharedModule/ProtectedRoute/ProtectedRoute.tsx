import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check token or authentication state
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;