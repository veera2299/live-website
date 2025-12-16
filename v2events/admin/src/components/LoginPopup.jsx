import React, { useState } from 'react';
import axios from 'axios';

const LoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {

  const url = "http://localhost:4000/admin/login";
  const [data, setData] = useState({
    email : "",
    password : "",
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData((data)=>({...data,[name]:value}));
}

  if (!isOpen) return null;

  const onLogin = async(e) => {
    e.preventDefault();
    // let newUrl = url;
    // newUrl = "admin/login";

    const response = await axios.post(url,data);

    if(response.data.success){
        localStorage.setItem("token", response.data.token);
        console.log('Logging in with:', data.email, data.password);

        // 2. Call the function passed from App.jsx to update the UI
    if (onLoginSuccess) {
        onLoginSuccess();
    }
    }
    

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      {/* Overlay: Closes popup when clicking outside the box */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Popup Box */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden z-10 animate-fade-in-up">
        
        {/* Header */}
        <div className="px-8 py-6 bg-linear-to-r from-blue-600 to-purple-600">
          <h2 className="text-2xl font-bold text-white text-center">Welcome Back</h2>
          <p className="text-blue-100 text-center mt-1 text-sm">Please sign in to continue</p>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <form onSubmit={onLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="you@example.com"
                name='email'
                value={data.email}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                name='password'
                value={data.password}
                onChange={onChangeHandler}
                required
              />
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">Forgot Password?</a>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? 
            <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold ml-1 hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;