import React from 'react';
import Navbar from '../layouts/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
        <Navbar />
        <div className='mb-10'></div>
        <Outlet />
    </div>
);
}

export default App;
