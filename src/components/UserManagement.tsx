import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { db } from '../utils/database';
import QRCode from 'qrcode.react';

interface User {
  id: string;
  name: string;
  pin: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    setUsers(db.getUsers());
  }, []);

  const createUser = () => {
    if (newUserName.trim()) {
      const newUser: User = {
        id: Date.now().toString(),
        name: newUserName.trim(),
        pin: Math.floor(1000 + Math.random() * 9000).toString(), // Generate a random 4-digit PIN
      };
      db.addUser(newUser);
      setUsers(db.getUsers());
      setNewUserName('');
    }
  };

  const updateUser = () => {
    if (editingUser) {
      db.updateUser(editingUser);
      setUsers(db.getUsers());
      setEditingUser(null);
    }
  };

  const deleteUser = (id: string) => {
    db.deleteUser(id);
    setUsers(db.getUsers());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name"
            className="flex-grow mr-4 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={createUser}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
          >
            <UserPlus className="mr-2" size={20} />
            Create User
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow">
              {editingUser && editingUser.id === user.id ? (
                <>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-2 py-1 mb-2 border rounded"
                  />
                  <button
                    onClick={updateUser}
                    className="w-full px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                  <QRCode value={`${user.id}|${user.pin}`} size={128} className="mx-auto mb-2" />
                  <p className="text-sm text-gray-600 text-center">User ID: {user.id}</p>
                  <p className="text-sm text-gray-600 text-center">PIN: {user.pin}</p>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;