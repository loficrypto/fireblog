// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">My Blog</Link>
        <div>
          <Link to="/" className="text-white mx-2">Home</Link>
          <Link to="/admin" className="text-white mx-2">Admin</Link>
          <Link to="/about" className="text-white mx-2">About Us</Link>
          <Link to="/privacy-policy" className="text-white mx-2">Privacy Policy</Link>
          <Link to="/terms" className="text-white mx-2">Terms</Link>
          <Link to="/contact" className="text-white mx-2">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
