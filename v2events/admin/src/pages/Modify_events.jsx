import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Edit, Trash2, MapPin, Calendar, Clock, Search, Youtube, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import css files for the slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const Modify_events = () => {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // API Config
  const API_URL = "http://localhost:4000/admin/all-events";
  const IMG_BASE_URL = "http://localhost:4000/admin/uploads/";

  // 1. Fetch Data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // FIX: Access 'allEvents' from the response object
        if (data.allEvents && Array.isArray(data.allEvents)) {
          setEvents(data.allEvents);
        } else {
          setEvents([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
        setEvents([]); 
      }
    };

    fetchEvents();
    console.log(events)
  }, []);

  // 2. Handle Delete
  const handleDelete = async (id) => {
    // 1. Get the token (assuming it's in localStorage)
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert("Authentication token not found. Please login.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        // 2. API Call
        const response = await axios.delete(`${API_URL}/${id}`, {
          headers: {
            token: token,
          }
        });

        // 3. Success Feedback
        if (response.data.success === "true" || response.data.success === true) {
            alert(response.data.message);
            
            // 4. Update UI
            const updatedEvents = events.filter(event => event._id !== id);
            setEvents(updatedEvents);
        }

      } catch (error) {
        console.error("Delete failed:", error);
        // Handle specific error messages from backend if they exist
        alert(error.response?.data?.message || "Failed to delete event. Please try again.");
      }
    }
  };

 // 3. Handle Edit
  const handleEdit = (id) => {
    navigate(`/admin/all-events/${id}`);
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB'); // dd/mm/yyyy
  };

  // 4. Filter Logic
  const filteredEvents = events.filter(event => {
    const title = event.eventName || '';
    const loc = event.location || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           loc.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // --- Carousel Configuration ---
  const CustomPrevArrow = ({ onClick }) => (
    <button onClick={onClick} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg transition-all" type="button">
      <ChevronLeft size={20} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button onClick={onClick} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg transition-all" type="button">
      <ChevronRight size={20} />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div className="p-6 lg:p-10 w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Modify Events</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, edit, or remove existing events</p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading events...</div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
              
              {/* Carousel */}
              <div className="h-52 bg-gray-100 relative group">
                {event.eventImages && event.eventImages.length > 0 ? (
                   <Slider {...sliderSettings}>
                     {event.eventImages.map((imgName, index) => (
                       <div key={index} className="h-52 outline-none">
                         <img 
                           src={`${IMG_BASE_URL}${imgName}`} 
                           alt={`Slide ${index}`} 
                           className="w-full h-full object-cover"
                           onError={(e) => {e.target.src = "https://via.placeholder.com/400x200?text=No+Image"}}
                         />
                       </div>
                     ))}
                   </Slider>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 flex-col">
                    <span className="text-xs">No Images</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{event.eventName}</h3>
                </div>
                
                <div className="space-y-2.5 text-sm text-gray-600 mb-6">
                  
                  {/* Names - Only show if exists */}
                  {event.names && (
                    <div className="flex items-center text-indigo-600 font-medium">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="truncate">{event.names}</span>
                    </div>
                  )}

                  {/* YT Code - Only show if exists */}
                  {event.ytCode && (
                    <div className="flex items-center">
                        <Youtube className="w-4 h-4 mr-2 text-red-500" />
                        <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{event.ytCode}</span>
                    </div>
                  )}

                  {/* Date/Time */}
                  <div className="flex gap-4">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
                  <button 
                    onClick={() => handleEdit(event._id)}
                    className="flex-1 flex items-center justify-center py-2 px-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modify
                  </button>
                  <button 
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 flex items-center justify-center py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No events found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Modify_events;