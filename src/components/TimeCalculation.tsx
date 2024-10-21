import React, { useState } from 'react';
import { ClipboardList, Clock } from 'lucide-react';

interface TimeEntry {
  userId: string;
  task: string;
  duration: number;
}

const TimeCalculation: React.FC = () => {
  // In a real application, this data would come from a backend
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { userId: 'USER123', task: 'Panel Beating', duration: 120 },
    { userId: 'USER123', task: 'Buffing', duration: 60 },
    { userId: 'USER456', task: 'Spray Painting', duration: 180 },
    { userId: 'USER789', task: 'Mechanical', duration: 240 },
  ]);

  const calculateTotalTime = (userId: string) => {
    return timeEntries
      .filter((entry) => entry.userId === userId)
      .reduce((total, entry) => total + entry.duration, 0);
  };

  const uniqueUsers = Array.from(new Set(timeEntries.map((entry) => entry.userId)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Time Calculation</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Time (minutes)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasks Completed
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {uniqueUsers.map((userId) => (
              <tr key={userId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ClipboardList className="mr-2 text-gray-500" size={20} />
                    <div className="text-sm font-medium text-gray-900">{userId}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="mr-2 text-gray-500" size={20} />
                    <div className="text-sm text-gray-900">{calculateTotalTime(userId)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {timeEntries
                      .filter((entry) => entry.userId === userId)
                      .map((entry) => entry.task)
                      .join(', ')}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeCalculation;