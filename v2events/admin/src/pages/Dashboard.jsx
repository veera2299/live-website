import React from 'react';

const Dashboard = () => {
  return (
    <div className="w-full h-full p-6 lg:p-10 flex flex-col items-center justify-start">
      
      {/* Image Container 
         - max-w-6xl ensures it doesn't get too wide on huge screens
         - rounded-xl and shadow-sm add that modern UI polish
      */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* IMPORTANT: Replace the src below with the path to where you saved the file.
            If you put it in the 'public' folder, usage is just "/filename.png"
        */}
        <img 
          src="/welcome.png" 
          alt="Welcome to v2 events admin page" 
          className="w-full h-auto object-cover"
        />
        
      </div>
    </div>
  );
};

export default Dashboard;