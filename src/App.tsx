import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ManagerLogin from './components/ManagerLogin';
import ManagerDashboard from './components/ManagerDashboard';
import UserDashboard from './components/UserDashboard';
import TimeCalculation from './components/TimeCalculation';
import UserManagement from './components/UserManagement';

function App() {
  const [isManagerLoggedIn, setIsManagerLoggedIn] = React.useState(false);

  const ManagerRoute = ({ children }: { children: React.ReactNode }) => {
    return isManagerLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ManagerLogin onLogin={() => setIsManagerLoggedIn(true)} />} />
          <Route
            path="/manager"
            element={
              <ManagerRoute>
                <ManagerDashboard />
              </ManagerRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ManagerRoute>
                <UserManagement />
              </ManagerRoute>
            }
          />
          <Route path="/user" element={<UserDashboard />} />
          <Route
            path="/time-calculation"
            element={
              <ManagerRoute>
                <TimeCalculation />
              </ManagerRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;