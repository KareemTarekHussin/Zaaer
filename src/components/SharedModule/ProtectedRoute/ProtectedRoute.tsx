import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const token = localStorage.getItem('token'); // Check token or authentication state
//   console.log("Token:", token);   //debugging lazm ytshal 
//   return token ? <>{children}</> : <Navigate to="/login" />;
// };
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check token or authentication state
  const isStaticFile = window.location.pathname.startsWith('/mock-api/'); // Exclude static file paths
  // console.log("Token:", token, "Is Static File:", isStaticFile); // Debugging
  return token || isStaticFile ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;