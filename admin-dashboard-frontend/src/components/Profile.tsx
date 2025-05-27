// src/components/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import type { User } from '../types';

export default function Profile() {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    role: '',
    avatar: '',
    createdAt: ''
  });
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<User>('/auth/me');
        if (!res.data || !res.data.id) throw new Error('Unauthorized');
        setUser(res.data);
      } catch (err) {
        console.error('Auth error:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await api.post<{ avatarUrl: string }>('/auth/upload-avatar', formData);
      setUser(prev => ({ ...prev, avatar: res.data.avatarUrl }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await api.put('/auth/update-profile', {
        name: user.name,
        password: password.trim() || undefined
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    }
  };

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f2937] p-4 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <p className="text-sm text-gray-400 mb-6">Control Panel</p>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="hover:text-cyan-400">Dashboard</a></li>
          <li><a href="/projects" className="hover:text-cyan-400">Projects</a></li>
          <li><a href="/users" className="hover:text-cyan-400">Users</a></li>
          <li><a href="/settings" className="hover:text-cyan-400">Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gradient-to-br from-[#1f1f2f] to-[#3f3f5f]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white text-black p-8 rounded shadow-md max-w-2xl">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email (read-only)</label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Avatar</label>
            <input type="file" onChange={handleAvatarUpload} className="w-full" />
            {user.avatar && <img src={user.avatar} alt="avatar" className="mt-4 w-24 h-24 rounded-full" />}
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
