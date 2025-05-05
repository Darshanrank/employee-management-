import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Rpassword, setRPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        if (password !== Rpassword) {
          alert('Passwords do not match');
          return;
        }else {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/register', { name,email, password });
                if (res.status === 201) {
                  alert('Registration successful');
                  navigate('/login');
                }
                
              } catch (err) {
                alert('Register failed');
              }
            };
        }
        
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-80">
      <h2 className="text-xl mb-4 font-bold">Register/Login</h2>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 mb-2 border"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Retype Password"
        className="w-full p-2 mb-4 border"
        value={Rpassword}
        onChange={(e) => setRPassword(e.target.value)}
      />
      <div className='flex'>
      <button className="bg-blue-500 text-white w-full p-2 rounded" onClick={handleLogin}>
        Register
      </button>
      <p className="bg-blue-500 text-white w-full p-2 ml-2 rounded text-center" onClick={()=>{
        navigate('/login');
      }}>Login</p>
      </div>
      
    </div>
  </div>
  )
}

export default Register