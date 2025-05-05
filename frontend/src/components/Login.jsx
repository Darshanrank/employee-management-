  import { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  
  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } catch (err) {
        alert('Login failed');
      }
    };
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-xl mb-4 font-bold">Login</h2>
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
          <button className="bg-blue-500 text-white w-full p-2 rounded" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    )
  }
  
  export default Login
  
  