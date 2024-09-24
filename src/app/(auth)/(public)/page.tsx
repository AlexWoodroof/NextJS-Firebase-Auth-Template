import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-title">Placeholder</h1>
      <p className="text-subtitle">
        Tag Line Here
      </p>
      <div className="buttons">
        <a href="/login" className="button" style={{ marginRight: '10px' }}>
          Login
        </a>
        <a href="/register" className="button">
          Register
        </a>
      </div>
    </div>
  );
};

export default Page;
