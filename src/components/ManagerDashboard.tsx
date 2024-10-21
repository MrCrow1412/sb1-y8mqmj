import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, ClipboardList } from 'lucide-react';

const ManagerDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manager Dashboard</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link
          to="/user-management"
          className="w-64 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <Users className="mr-2" size={20} />
          User Management
        </Link>
        <Link
          to="/user"
          className="w-64 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        >
          <Clock className="mr-2" size={20} />
          User Dashboard
        </Link>
        <Link
          to="/time-calculation"
          className="w-64 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
        >
          <ClipboardList className="mr-2" size={20} />
          Time Calculation
        </Link>
      </div>
    </div>
  );
};

export default ManagerDashboard;