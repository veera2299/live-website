import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// Added 'Trash2' and 'Plus' for the timeline UI
import { Calendar, Clock, MapPin, Upload, X, Save, ArrowLeft, Trash2, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addevent = () => {
  const { eventId } = useParams();
  const id = eventId;
  const navigate = useNavigate();
  const url = "http://localhost:4000/admin";
  const imgBaseUrl = "http://localhost:4000/admin/uploads/";

  // --- State Management ---
  const [files, setFiles] = useState([]); 
  const [oldImages, setOldImages] = useState([]); 
  
  // 1. NEW: State for tracking deleted images and timeline
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [timeline, setTimeline] = useState([
    { time: '', title: '', description: '' } // Default empty row
  ]);

  const [eventName, setEventName] = useState('');
  const [names, setNames] = useState('');
  const [ytcode, setYtcode] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  // --- 1. Fetch Data ---
  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`${url}/all-events`);
          const event = response.data.allEvents.find(e => e._id === id);

          if (event) {
            setEventName(event.eventName);
            setNames(event.names || '');
            setYtcode(event.ytCode || '');
            setDate(event.date ? new Date(event.date).toISOString().split('T')[0] : '');
            setTime(event.time);
            setLocation(event.location);
            setOldImages(event.eventImages || []);
            
            // 2. NEW: Load existing timeline or keep default empty
            if (event.timeline && event.timeline.length > 0) {
                setTimeline(event.timeline);
            }
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          alert("Could not load event data.");
        }
      };
      fetchEvent();
    }
  }, [id]);

  // --- 2. Image Handlers ---
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeNewFile = (name) => {
    setFiles(currentFiles => currentFiles.filter(file => file.name !== name));
  };

  // 3. NEW: Handle removing an OLD image (Server deletion)
  const removeOldImage = (filename) => {
      // Add to deletion queue
      setImagesToDelete(prev => [...prev, filename]);
      // Remove from UI immediately
      setOldImages(prev => prev.filter(img => img !== filename));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  // --- 4. NEW: Timeline Handlers ---
  const handleTimelineChange = (index, field, value) => {
    const updatedTimeline = timeline.map((item, i) => {
        if (i === index) {
            return { ...item, [field]: value }; // Create new object for this row
        }
        return item;
    });
    setTimeline(updatedTimeline);
};

  const addTimelineRow = () => {
      setTimeline([...timeline, { time: '', title: '', description: '' }]);
  };

  const removeTimelineRow = (index) => {
      const updatedTimeline = timeline.filter((_, i) => i !== index);
      setTimeline(updatedTimeline);
  };

  // --- 5. Handle Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    
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
            formData.append("images", file); // Key matches backend 'upload.array("images")'
        });
    }

    // 6. NEW: Append Complex Data (Stringify Arrays)
    // Only send timeline if it has valid data
    const validTimeline = timeline.filter(t => t.time && t.title);
    formData.append("timeline", JSON.stringify(validTimeline));
    
    // Send images to delete
    if (imagesToDelete.length > 0) {
        formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
    }

    try {
      let response;
      const config = { headers: { token } };

      if (id) {
        // FIXED: Switched to POST to ensure images upload correctly
        response = await axios.put(`${url}/update-event/${id}`, formData, config);
      } else {
        response = await axios.post(`${url}/add-event`, formData, config);
      }

      if (response.data.success) {
        alert(id ? "Event Updated Successfully" : "New Event Added Successfully");
        if (!id) resetForm();
        else navigate('/admin/modify_events'); 
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
    setTimeline([{ time: '', title: '', description: '' }]);
    setImagesToDelete([]);
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
          
          <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50'}`}>
            <input {...getInputProps()} />
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            {isDragActive ? <p className="text-indigo-600 font-medium">Drop images here...</p> : 
                <div><p className="text-gray-700 font-medium">Drag & drop new images here</p><p className="text-gray-400 text-sm mt-1">Upload multiple files</p></div>
            }
          </div>

          {/* PREVIEW: EXISTING IMAGES (With Delete Functionality) */}
          {oldImages.length > 0 && (
              <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Images:</p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {oldImages.map((imgName, idx) => (
                          <div key={idx} className="relative group aspect-square">
                              <img src={`${imgBaseUrl}${imgName}`} alt="Existing" className="w-full h-full object-cover rounded-md border border-gray-200" />
                              {/* DELETE BUTTON FOR OLD IMAGES */}
                              <button
                                type="button"
                                onClick={() => removeOldImage(imgName)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {/* PREVIEW: NEW UPLOADS */}
          {files.length > 0 && (
            <div className="mt-4">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">New Uploads:</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {files.map((file) => (
                    <div key={file.name} className="relative group aspect-square">
                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover rounded-md border border-green-200 ring-2 ring-green-100" />
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeNewFile(file.name); }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={12} />
                    </button>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- Text Inputs --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                <input type="text" required value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="e.g. Marriage" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couple/Host Names</label>
                <input type="text" required value={names} onChange={(e) => setNames(e.target.value)} placeholder="e.g. John & Jane" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
        </div>

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video ID</label>
            <input type="text" required value={ytcode} onChange={(e) => setYtcode(e.target.value)} placeholder="e.g. dQw4w9WgXcQ" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700" />
            </div>
          </div>
        </div>

        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter full address" className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
        </div>

        {/* --- 7. NEW: Timeline Section --- */}
        <div className="mb-8 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Order of Events</h3>
                <button type="button" onClick={addTimelineRow} className="text-sm flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                    <Plus size={16} className="mr-1" /> Add Row
                </button>
            </div>
            
            <div className="space-y-3">
                {timeline.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <input 
                            type="text" 
                            placeholder="Time (e.g. 10:00 AM)" 
                            value={item.time}
                            onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                            className="w-full md:w-32 p-2 border border-gray-300 rounded text-sm focus:border-indigo-500 outline-none"
                        />
                        <input 
                            type="text" 
                            placeholder="Title (e.g. Ceremony)" 
                            value={item.title}
                            onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                            className="w-full md:w-48 p-2 border border-gray-300 rounded text-sm focus:border-indigo-500 outline-none"
                        />
                        <input 
                            type="text" 
                            placeholder="Description" 
                            value={item.description}
                            onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:border-indigo-500 outline-none"
                        />
                        <button 
                            type="button" 
                            onClick={() => removeTimelineRow(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end border-t border-gray-100 pt-6">
           <button 
             type="button" 
             className="mr-4 px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
             onClick={() => id ? navigate('/admin/modify_events') : resetForm()}
           >
             Cancel
           </button>
           
           <button 
             type="submit" 
             disabled={loading}
             className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition shadow-sm disabled:bg-indigo-300 cursor-pointer"
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