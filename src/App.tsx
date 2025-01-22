import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';
import ListViewPage from './pages/ListViewPage';
import ReportPage from './pages/ReportPage';
import CustomPage from './pages/CustomPage';
import ProtectedRoute from './components/SharedModule/ProtectedRoute/ProtectedRoute';
import MasterLayout from './components/SharedModule/MasterLayout/MasterLayout';
import DynamicPage from './pages/DynamicPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
    
        <Route path="/login" element={<Login />} />

       
        <Route
          element={
            <ProtectedRoute>
              <MasterLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form/:mode/:id?" element={<FormPage />} />
          <Route path="/listview/:entity" element={<ListViewPage />} />
          <Route path="/report/:reportType" element={<ReportPage />} />
          <Route path="/custom/:pageName" element={<CustomPage />} />
          <Route path="/dynamic/:pageName" element={<DynamicPage />} />
        </Route>

      
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;







// prev failed code
//<Router>
//<Routes>
 // {/* Login Route */}
 // <Route path="/login" element={<Login />} />

 // {/* Protected Routes */}
 // <Route
   // path="/dashboard"
  //  element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
 // />
//
 // <Route
//    path="/form/:mode/:id?"
//    element={<ProtectedRoute><FormPage /></ProtectedRoute>}
//  />
//
//  <Route
//    path="/listview/:entity"
//    element={<ProtectedRoute><ListViewPage /></ProtectedRoute>}
 // />
//
 // <Route
 //   path="/report/:reportType"
 //   element={<ProtectedRoute><ReportPage /></ProtectedRoute>}
 // />
//
 // <Route
 //   path="/custom/:pageName"
 //   element={<ProtectedRoute><CustomPage /></ProtectedRoute>}
 // />

//  {/* Redirect to Login if no route matches */}
 // <Route path="*" element={<Navigate to="/login" />} />
//</Routes>
//</Router>
