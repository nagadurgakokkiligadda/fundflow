import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './flows/Dashboard';
import Logout from './flows/Logout'; // Import the Login component
import Colevies from './flows/Colevies'; // Corrected import path
// import Circle from './flows/Circle';

function App() {
  return (
    <div>
      {/* <Circle/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/logout" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/colevies" element={<Colevies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
