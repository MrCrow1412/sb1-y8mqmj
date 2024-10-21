import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

interface ManagerLoginProps {
  onLogin: () => void;
}

const ManagerLogin: React.FC<ManagerLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Test1' && password === 'Test1') {
      onLogin();
      navigate('/manager');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800">Manager Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <User className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none flex-1"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <Lock className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none flex-1"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex items-baseline justify-center">
            <button
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;