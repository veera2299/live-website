import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EventLayout from '../components/EventLayout';

const EventDetails = () => {
  // 1. Get the Event ID from the URL (e.g., /event/65a...)
  const { id } = useParams();
  
  // 2. Local state to hold this specific event's data
  const [singleEvent, setSingleEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Fetch data when the ID changes
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // Ensure this URL matches your backend route for getting a single event
        // It might be /admin/all-events or a dedicated /event/:id route
        // If you don't have a specific ID route, we can fetch all and find one:
        
        const response = await axios.get('http://localhost:4000/admin/all-events'); 
        const foundEvent = response.data.allEvents.find(e => e._id === id);

        if (foundEvent) {
          setSingleEvent(foundEvent);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  // 4. Loading State
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1e1b4b]">
        <div className="text-white font-serif text-xl animate-pulse">
           Loading Event Details...
        </div>
      </div>
    );
  }

  // 5. Error State
  if (error || !singleEvent) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white">
        <h2 className="text-3xl font-serif mb-4 text-red-400">Event Not Found</h2>
        <p className="opacity-70">The event you are looking for does not exist or has been removed.</p>
        <a href="/" className="mt-6 text-pink-400 hover:text-pink-300 underline">Return to Home</a>
      </div>
    );
  }

  // 6. Render the Reusable Layout with the specific data
  return (
    <EventLayout eventData={singleEvent} />
  );
};

export default EventDetails;