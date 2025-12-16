import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'; // Import the package
import { Calendar, Clock, MapPin, Upload, X } from 'lucide-react';

const Addevent = () => {
  // State Management
  const [files, setFiles] = useState([]);
  const [eventName, setEventName] = useState('');
  const [names, setNames] = useState('');
  const [ytcode, setYtcode] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  // 1. Handle Multiple Image Drops
  const onDrop = useCallback((acceptedFiles) => {
    // Create preview URL for images so we can show them
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    
    // Add new files to existing ones (allowing multiple batches)
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = (name) => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Accept all image types
    multiple: true // Allow multiple files
  });

  // 4. Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      eventName,
      names,
      ytcode, 
      date,
      time,
      location,
      images: files
    };
    console.log("Submitting Event Data:", eventData);
    alert("Event Created! Check console for data.");
  };

  return (
    <div className="p-6 lg:p-10 w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
        
        {/* 1. Multiple Image Upload Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Images</label>
          
          {/* Dropzone Area */}
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50'}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            {isDragActive ? (
              <p className="text-indigo-600 font-medium">Drop the images here ...</p>
            ) : (
              <div>
                <p className="text-gray-700 font-medium">Drag & drop images here, or click to select</p>
                <p className="text-gray-400 text-sm mt-1">Upload multiple files (JPG, PNG, WebP)</p>
              </div>
            )}
          </div>

          {/* Image Previews */}
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {files.map((file) => (
                <div key={file.name} className="relative group">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="h-24 w-full object-cover rounded-md border border-gray-200"
                    // Revoke data uri after image is loaded to avoid memory leaks
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                  />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(file.name); }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
          <input
            type="text"
            required
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g. Marriage"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

         {/* Names */}
         <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Names</label>
          <input
            type="text"
            required
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="e.g. Couple Names"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

         {/* YT code */}
         <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">YT code</label>
          <input
            type="text"
            required
            value={ytcode}
            onChange={(e) => setYtcode(e.target.value)}
            placeholder="Enter Youtube Code"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* 2. Date and Time (Native Inputs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* 3. Location (Clean Input) */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter full address or venue name"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* 4. Submit Button */}
        <div className="flex items-center justify-end border-t border-gray-100 pt-6">
           <button 
             type="button" 
             className="mr-4 px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
             onClick={() => alert('Cancelled')}
           >
             Cancel
           </button>
           
           <button 
             type="submit" 
             className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition shadow-sm"
           >
             Publish Event
           </button>
        </div>

      </form>
    </div>
  );
};

export default Addevent;