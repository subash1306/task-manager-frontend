import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', status: '' });
  const [saving, setSaving] = useState(false); // 👈 Your saving state added here

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then((res) => {
      const task = res.data.find((t) => t._id === id);
      if (task) setForm(task);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); // 👈 Start saving
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success("Task saved"); // 👈 Notify success
      navigate('/dashboard');
    } catch (err) {
      toast.error("Error saving task"); // 👈 Notify error
    }
    setSaving(false); // 👈 Stop saving
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Task</h2>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button className="btn btn-primary" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default EditTask;
