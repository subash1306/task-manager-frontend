import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', form);
    alert('Registered! Please login.');
    navigate('/login');
  };

  return (
    // Add Bootstrap wrapper and spacing
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <h2 className="mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="form-control mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;

