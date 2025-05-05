import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const Dashboard = () => {
const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: token },
      });
      setEmployees(res.data);
    } catch (err) {
      alert('Error fetching employees');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: token },
        });
        fetchEmployees();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/employees/search?q=${search}`, {
      headers: { Authorization: token },
    });
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          onClick={() => navigate('/create')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-1/2"
          placeholder="Search by name"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Profile</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td className="p-2 border">
                <img src={`http://localhost:5000/${emp.profilePic}`} alt="profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.email}</td>
              <td className="p-2 border">{emp.type}</td>
              <td className="p-2 border">
                <button
                  onClick={() => navigate(`/edit/${emp._id}`)}
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard 




