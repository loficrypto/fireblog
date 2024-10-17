// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Blog from './components/Blog';
import Admin from './components/Admin';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Post from './components/Post';
import Navbar from './components/Navbar';
import { analytics } from './firebaseConfig';
import { logEvent } from 'firebase/analytics';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', { page_path: location.pathname });
  }, [location]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
};

export default App;
