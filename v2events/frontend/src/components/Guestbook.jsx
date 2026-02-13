import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useEvent } from '../contextApi/EventContext';

// Accept eventId as a prop (or get from URL)
const Guestbook = ({ eventId }) => {


  const {allEvents, loading} = useEvent();

  

  // FALLBACK: If eventId isn't passed as a prop, try getting it from the URL
  // const params = useParams();
  // const activeEventId = eventId || params.id; 
  // For now, let's assume you pass it as a prop <Guestbook eventId={id} />

  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = "http://localhost:4000/admin";

  // --- FETCH MESSAGES FOR THIS SPECIFIC EVENT ---
  const fetchMessages = async () => {
    if (!eventId) return; // Don't fetch if no ID

    try {
      // Changed URL to include eventId
      const response = await axios.get(`${API_BASE_URL}/messages/${eventId}`);
      if (response.data && response.data.messages) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [eventId]); // Refetch if eventId changes

  // --- SUBMIT MESSAGE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/add-message`, {
        name: formData.name,
        message: formData.message,
        eventId: eventId // <--- SEND THE LINK HERE
      });

      setFormData({ name: '', message: '' });
      fetchMessages();
      alert("Message sent successfully!");

    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (Rest of your JSX, format Date helper, etc. remains the same) ...

  // Helper to format Date
  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // --- DYNAMIC SUBTITLE LOGIC ---
  const getSubtitle = () => {
    if (loading) return "Loading...";
    
    const activeEvent = allEvents.find(event => event._id === eventId)
    

    const type = ( activeEvent.eventName|| "").toLowerCase();

    
    // Weddings / Receptions
    if (type.includes('marriage') || type.includes('wedding') || type.includes('reception') || type.includes('engagement')) {
        return "Drop a message to read for the couple later";
    }
    
    // Birthdays
    if (type.includes('birthday')) {
        return `Wish ${activeEvent.names || "the birthday star"} a wonderful year ahead`;
    }

    // Default
    return "Leave a message for us to cherish";
  };


  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans m-4 md:m-8 rounded-2xl overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* ... Header ...
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] tracking-wider mb-4">
             Guestbook
          </h2>
        </div> */}


        {/* ... Header ... */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] tracking-wider mb-4">
            Guestbook
          </h2>
          {/* Dynamic Subtitle from Context Data */}
          <p className="text-pink-200/80 text-sm md:text-lg tracking-wide font-light italic">
            {getSubtitle()}
          </p>
        </div>


        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Section */}
          <div className="lg:w-1/3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs for Name and Message */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Your Name</label>
                  <input type="text" placeholder="Enter your full name" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                  <textarea name="message" placeholder="Write your beautiful wishes here..." required value={formData.message} onChange={handleChange} rows="4" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-lg">
                  {isSubmitting ? 'Sending...' : 'Send Love'}
                </button>
              </form>
            </div>
          </div>

          {/* Messages List Section */}
          <div className="lg:w-2/3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 italic">
              <span className="text-4xl mb-4 opacity-50">💌</span>
              No messages yet. Be the first to wish!
          </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.map((msg) => (
                  <div key={msg._id} className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-xl">
                    <p className="text-gray-300 italic mb-6">"{msg.message}"</p>
                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                      <h4 className="font-['Playfair_Display'] text-lg text-pink-100">{msg.name}</h4>
                      {/* <span className="text-xs text-gray-500">{formatDate(msg.displayDate)}</span> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guestbook;