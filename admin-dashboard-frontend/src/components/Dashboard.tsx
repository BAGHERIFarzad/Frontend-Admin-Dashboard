import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import api from '../api/axiosInstance';
import '../assets/dashboard.css';
import type { User } from '../types';


export default function Dashboard() {
  const [stats, setStats] = useState<{ emails: number; projects: number; users: number }>({ emails: 0, projects: 0, users: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchUsers();
    initCharts();
  }, []);

  const fetchStats = async () => {
    const res = await api.get<{ emails: number; projects: number; users: number }>('/dashboard/stats');
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get<User[]>('/dashboard/users');
    setUsers(res.data);
  };

  const initCharts = () => {
    const chartEl = document.getElementById('myChart') as HTMLCanvasElement;
    if (Chart.getChart(chartEl)) Chart.getChart(chartEl)?.destroy();

    new Chart(chartEl, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Success',
            data: [20, 40, 30, 50, 60],
            backgroundColor: '#007bff',
          },
        ],
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h2>Admin</h2>
        <p style={{ fontSize: '12px', color: '#aaa' }}>Control Panel</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </aside>

      <div className="main-content">
        <div>
          <a className="logout-btn" onClick={logout}>Logout</a>
          <h1>Admin Dashboard</h1>
        </div>

        <div className="stat-boxes">
          <div className="stat-box stat-blue">
            <h5>Emails</h5>
            <p>{stats.emails}</p>
            <span>Total received</span>
          </div>
          <div className="stat-box stat-red">
            <h5>Projects</h5>
            <p>{stats.projects}</p>
            <span>Total projects</span>
          </div>
          <div className="stat-box stat-green">
            <h5>Users</h5>
            <p>{stats.users}</p>
            <span>Registered users</span>
          </div>
        </div>

        <h3>User List</h3>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : 'N/A'}</td>

              </tr>
            ))}
          </tbody>
        </table>

        <h3>Monthly Activity</h3>
        <canvas id="myChart" style={{ background: 'white', borderRadius: '10px', padding: '20px' }} />
      </div>
    </div>
  );
}
