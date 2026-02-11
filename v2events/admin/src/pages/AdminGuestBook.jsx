import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Calendar, MapPin, ArrowRight } from 'lucide-react';

import { getCloudinaryUrl } from '../utils/imageHelper';

const AdminGuestBook = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const API_URL = "http://localhost:4000/admin"; // Adjust to your backend URL

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Reuse your existing 'get all events' API
                const response = await axios.get(`${API_URL}/all-events`);
                if (response.data && response.data.allEvents) {
                    setEvents(response.data.allEvents);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Guest Book Management</h1>
            <p className="text-gray-500 mb-8">Select an event to manage its guest messages.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                        
                        {/* Event Image Cover */}
                        <div className="h-40 bg-gray-100 relative">
                             {event.eventImages && event.eventImages.length > 0 ? (
                                <img 
                                    src={getCloudinaryUrl(event.eventImages?.[0])} 
                                    alt={event.eventName} 
                                    className="w-full h-full object-cover"
                                />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <MessageSquare size={40} />
                                </div>
                             )}
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{event.eventName}</h3>
                            <p className="text-indigo-600 font-medium text-sm mb-4">{event.names}</p>
                            
                            <div className="space-y-2 text-sm text-gray-500 mb-6">
                                <div className="flex items-center">
                                    <Calendar size={16} className="mr-2 text-gray-400" />
                                    {event.date ? new Date(event.date).toLocaleDateString() : 'Date not set'}
                                </div>
                                <div className="flex items-center">
                                    <MapPin size={16} className="mr-2 text-gray-400" />
                                    {event.location || 'Location not set'}
                                </div>
                            </div>

                            {/* Modify Button */}
                            <button 
                                onClick={() => navigate(`/admin/guestbook/${event._id}`)}
                                className="mt-auto w-full flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
                            >
                                Modify Messages <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGuestBook;