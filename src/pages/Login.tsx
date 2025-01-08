import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   const response = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   if (response.ok) {
  //     const { token } = await response.json();
  //     localStorage.setItem('token', token); // Save token for authentication
  //     navigate('/dashboard'); 
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };

// dah temperoray 3shan agrab bas el mashroo3
const handleLogin = () => {
    // Mock login logic
    if (email === "admin@gmail.com" && password === "password") {
      // Save login state in localStorage or context
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard"); 
    } else {
      alert("Invalid credentials! Try admin@gmail.com/password");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
  <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  </div>
</div>
  );
};

export default Login;