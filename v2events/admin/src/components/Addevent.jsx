import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Calendar, Clock, MapPin, Upload, X, Save, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addevent = () => {
  const { eventId } = useParams(); // Get ID from URL
  const id = eventId;
  const navigate = useNavigate();
  const url = "http://localhost:4000/admin";
  const imgBaseUrl = "http://localhost:4000/admin/uploads/"; // Adjust if needed

  // --- State Management ---
  const [files, setFiles] = useState([]); // New files to upload
  const [oldImages, setOldImages] = useState([]); // Existing images from DB
  const [eventName, setEventName] = useState('');
  const [names, setNames] = useState('');
  const [ytcode, setYtcode] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  // --- 1. Fetch Data if Edit Mode ---
  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          // Ideally use a specific endpoint: axios.get(`${url}/event/${id}`)
          // For now, fetching all and filtering (based on your previous context)
          const response = await axios.get(`${url}/all-events`);
          const event = response.data.allEvents.find(e => e._id === id);

          if (event) {
            setEventName(event.eventName);
            setNames(event.names || '');
            setYtcode(event.ytCode || '');
            // Format date to YYYY-MM-DD for input field
            setDate(event.date ? new Date(event.date).toISOString().split('T')[0] : '');
            setTime(event.time);
            setLocation(event.location);
            setOldImages(event.eventImages || []);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          alert("Could not load event data.");
        }
      };
      fetchEvent();
    }
  }, [id]);

  // --- 2. Handle New Image Drops ---
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = (name) => {
    setFiles(currentFiles => currentFiles.filter(file => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  // --- 3. Handle Submit (Add or Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
        alert("You are not logged in!");
        setLoading(false);
        return;
    }
      
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("names", names);
    formData.append("ytCode", ytcode);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    
    // Append NEW files
    if (files.length > 0) {
        files.forEach((file) => {
            formData.append("images", file);
        });
    }

    try {
      let response;
      if (id) {
        // --- UPDATE MODE ---
        response = await axios.put(`${url}/update-event/${id}`, formData, {
            headers: { token }
        });
      } else {
        // --- ADD MODE ---
        response = await axios.post(`${url}/add-event`, formData, {
            headers: { token }
        });
      }

      if (response.data.success) {
        alert(id ? "Event Updated Successfully" : "New Event Added Successfully");
        if (!id) {
           // Reset form only if Adding
           resetForm();
        } else {
           // Navigate back if Updating
           navigate('/admin/modify_events'); 
        }
      } else {
          alert(response.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error occurred. Please check console.");
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
    setEventName('');
    setNames('');
    setYtcode('');
    setDate('');
    setTime('');
    setLocation('');
    setFiles([]);
    setOldImages([]);
  };

  return (
    <div className="p-6 lg:p-10 w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
            {id ? "Update Event" : "Create New Event"}
        </h1>
        {id && (
            <button onClick={() => navigate('/admin/modify-events')} className="text-sm text-gray-500 hover:text-indigo-600 flex items-center">
                <ArrowLeft size={16} className="mr-1"/> Back
            </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
        
        {/* --- Image Upload Section --- */}
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
                <p className="text-gray-700 font-medium">Drag & drop new images here</p>
                <p className="text-gray-400 text-sm mt-1">Upload multiple files (JPG, PNG, WebP)</p>
              </div>
            )}
          </div>

          {/* PREVIEW: EXISTING IMAGES (Edit Mode) */}
          {oldImages.length > 0 && (
              <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Images:</p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {oldImages.map((imgName, idx) => (
                          <div key={idx} className="relative group aspect-square">
                              <img 
                                  src={`${imgBaseUrl}${imgName}`} 
                                  alt="Existing" 
                                  className="w-full h-full object-cover rounded-md border border-gray-200"
                                  onError={(e) => e.target.style.display = 'none'}
                              />
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {/* PREVIEW: NEW UPLOADS */}
          {files.length > 0 && (
            <div className="mt-4">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">New Uploads:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {files.map((file) => (
                    <div key={file.name} className="relative group">
                    <img
                        src={file.preview}
                        alt={file.name}
                        className="h-24 w-full object-cover rounded-md border border-green-200 ring-2 ring-green-100"
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
            </div>
          )}
        </div>

        {/* --- Text Inputs --- */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

        {/* Buttons */}
        <div className="flex items-center justify-end border-t border-gray-100 pt-6">
           <button 
             type="button" 
             className="mr-4 px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
             onClick={() => id ? navigate('/admin/modify-events') : resetForm()}
           >
             Cancel
           </button>
           
           <button 
             type="submit" 
             disabled={loading}
             className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition shadow-sm disabled:bg-indigo-300"
           >
             <Save className="w-4 h-4 mr-2" />
             {loading ? "Saving..." : (id ? "Update Event" : "Publish Event")}
           </button>
        </div>

      </form>
    </div>
  );
};

export default Addevent;