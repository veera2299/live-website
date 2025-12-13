import React, { useState } from 'react';
import { Edit, Trash2, MapPin, Calendar, Clock, Search } from 'lucide-react';

const Modify_events = () => {
  // 1. Mock Data
  const initialEvents = [
    {
      id: 1,
      title: "Annual Tech Conference 2024",
      date: "2024-09-15",
      time: "09:00",
      location: "Convention Center, New York",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Startup Networking Mixer",
      date: "2024-10-02",
      time: "18:30",
      location: "The Hive, San Francisco",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Product Launch: Version 2.0",
      date: "2024-11-20",
      time: "14:00",
      location: "Tech Hub, Austin",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Design Systems Workshop",
      date: "2024-12-05",
      time: "10:00",
      location: "Remote / Zoom",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Handle Delete Logic
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
    }
  };

  // 3. Handle Edit Logic
  const handleEdit = (id) => {
    alert(`Redirect to edit page for Event ID: ${id}`);
  };

  // Filter events based on search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10 w-full">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Modify Events</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, edit, or remove existing events</p>
        </div>
        
        {/* Local Search Bar */}
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

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
              
              {/* Event Image */}
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm">
                  ID: {event.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">{event.title}</h3>
                
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
                  <button 
                    onClick={() => handleEdit(event.id)}
                    className="flex-1 flex items-center justify-center py-2 px-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
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