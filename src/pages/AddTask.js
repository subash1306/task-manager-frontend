import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTask() {
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input type="text" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTask;
