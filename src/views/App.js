import React from 'react';
import Navbar from '../layouts/Navbar';

function App({children}) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
        <Navbar />
        <div className='mb-10'></div>
        {children}
    </div>
);
}

export default App;
