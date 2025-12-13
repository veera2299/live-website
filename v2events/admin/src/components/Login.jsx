import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  return (
    // Outer Container: Simulates the blurry background
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-blue-100 to-gray-200">
      
      {/* Login Card: Glass effect with rounded corners */}
      <div className="w-full max-w-md p-10 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 flex flex-col gap-6">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:ring-4 focus:ring-blue-400/20 transition-all duration-200"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:ring-4 focus:ring-blue-400/20 transition-all duration-200"
          />

          {/* Sign In Button: Pill shape (rounded-full) */}
          <button
            type="submit"
            className="w-full py-4 mt-2 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg transition-transform active:scale-[0.98]"
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;