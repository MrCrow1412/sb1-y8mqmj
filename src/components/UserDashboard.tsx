import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Clock, CheckCircle, Briefcase, KeyRound, Camera } from 'lucide-react';
import jsQR from 'jsqr';

const tasks = ['Panel Beating', 'Buffing', 'Spray Painting', 'Mechanical'];

const UserDashboard: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = useCallback(() => {
    setIsScanning(true);
    const scanInterval = setInterval(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(image, 0, 0);
          const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
          if (imageData) {
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setScannedData(code.data);
              setIsScanning(false);
              clearInterval(scanInterval);
            }
          }
        };
      }
    }, 500);

    return () => clearInterval(scanInterval);
  }, []);

  const handlePinSubmit = () => {
    if (scannedData) {
      const [userId, correctPin] = scannedData.split('|');
      if (enteredPin === correctPin) {
        setIsAuthenticated(true);
      } else {
        alert('Invalid PIN');
      }
    }
  };

  const handleClockInOut = () => {
    if (isAuthenticated) {
      setIsClockedIn(!isClockedIn);
      console.log(`User ${scannedData?.split('|')[0]} ${isClockedIn ? 'clocked out' : 'clocked in'}`);
    }
  };

  const handleTaskSelection = (task: string) => {
    setSelectedTask(task);
    console.log(`User ${scannedData?.split('|')[0]} selected task: ${task}`);
  };

  const isWithinWorkHours = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour * 60 + minute;

    if (day >= 1 && day <= 4) {
      // Monday to Thursday
      return time >= 7 * 60 + 30 && time <= 17 * 60;
    } else if (day === 5) {
      // Friday
      return time >= 7 * 60 + 30 && time <= 16 * 60;
    }
    return false;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>
      {!scannedData && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">QR Code Scanner</h2>
          <div className="flex justify-center mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleScan}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              disabled={isScanning}
            >
              <Camera className="mr-2" size={20} />
              {isScanning ? 'Scanning...' : 'Scan QR Code'}
            </button>
          </div>
        </div>
      )}
      {scannedData && !isAuthenticated && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Enter PIN</h2>
          <div className="flex items-center justify-center">
            <input
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              className="px-4 py-2 border rounded-lg mr-2"
              placeholder="Enter 4-digit PIN"
            />
            <button
              onClick={handlePinSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <KeyRound className="mr-2" size={20} />
              Submit
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">User Actions</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleClockInOut}
              className={`px-4 py-2 ${
                isClockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white rounded-lg transition-colors flex items-center`}
              disabled={!isWithinWorkHours()}
            >
              {isClockedIn ? (
                <>
                  <CheckCircle className="mr-2" size={20} />
                  Clock Out
                </>
              ) : (
                <>
                  <Clock className="mr-2" size={20} />
                  Clock In
                </>
              )}
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && isClockedIn && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Task</h2>
          <div className="grid grid-cols-2 gap-4">
            {tasks.map((task) => (
              <button
                key={task}
                onClick={() => handleTaskSelection(task)}
                className={`px-4 py-2 ${
                  selectedTask === task ? 'bg-purple-600' : 'bg-purple-500'
                } text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center`}
              >
                <Briefcase className="mr-2" size={20} />
                {task}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;