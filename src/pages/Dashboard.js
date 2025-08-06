import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(res.data);
      } catch (err) {
        toast.error("Failed to load tasks");
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // Refresh tasks after deletion
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTasks(res.data);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center mt-5">No tasks yet. Click Add Task to create one!</div>;
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/add-task')}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <br />
            {task.description}
            <br />
            <button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
