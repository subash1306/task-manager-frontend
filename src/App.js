import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

import logo from './logo.svg';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🔹 React Logo Home Page (Default Boilerplate UI)
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// 🔹 Main App Component with Routing + ToastContainer
function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <Router>
        <Routes>
          {/* Show React logo boilerplate at /home */}
          <Route path="/home" element={<Home />} />

          {/* Redirect base path to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-task"
            element={isLoggedIn ? <AddTask /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-task/:id"
            element={isLoggedIn ? <EditTask /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>

      {/* Global Toast Notifications */}
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
