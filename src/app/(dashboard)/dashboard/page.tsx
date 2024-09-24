'use client';

// Dashboard.tsx
import React from 'react';
import dashboardStyles from './dashboard.module.css'; // Create a CSS file for styles

const Dashboard: React.FC = () => {
  return (
    <div className={dashboardStyles.dashboard}>
      <header className={dashboardStyles.header}>
        <h1>Dashboard</h1>
      </header>
      <aside className={dashboardStyles.sidebar}>
        <ul>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </aside>
      <main className={dashboardStyles.mainContent}>
        <h2>Main Content Area</h2>
        <p>This is where your main content will go.</p>
      </main>
    </div>
  );
};

export default Dashboard;
