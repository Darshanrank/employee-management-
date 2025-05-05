import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const api=import.meta.env.VITE_API_URI;
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${api}/api/employees/${id}`, {
        headers: { Authorization: token },
      });
      setName(res.data.name);
      setEmail(res.data.email);
      setType(res.data.type);
    } catch (err) {
      alert('Failed to load employee data');
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('type', type);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${api}/api/employees/${id}`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        },
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to update employee');
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 mb-3 border"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        className="w-full p-2 mb-3 border"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="Manager">Manager</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
      </select>
      <input
        type="file"
        className="w-full mb-3"
        onChange={(e) => setProfilePic(e.target.files[0])}
      />
      <button onClick={handleUpdate} className="w-full bg-yellow-500 text-white py-2 rounded">
        Update
      </button>
    </div>
  )
}

export default EditEmployee




