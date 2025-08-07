import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // ✅ Add Link here
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://task-manager-backend-4-gjh5.onrender.com/api/auth/login', // ✅ Make sure your backend route is correct!
        form
      );
      localStorage.setItem('token', res.data.token);
      toast.success("Logged in successfully!");
      console.log("Login success, navigating now...");
      navigate('/dashboard');
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>

      {/* ✅ Add Register link below */}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

export default Login;
