import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // Store the categorized data
  const [data, setData] = useState({
    homeEvent: null,      // The single event for Home Page
    upcomingEvents: [],   // Array for Upcoming Page
    completedEvents: [],  // Array for Completed Page
    allEvents: []         // Backup of everything
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch ALL events
        const response = await axios.get('http://localhost:4000/admin/all-events'); 
        const events = response.data.allEvents || [];

        const now = new Date();

        // 2. Filter & Sort UPCOMING (Future dates, closest first)
        const upcoming = events
          .filter(event => new Date(event.date) > now)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        // 3. Filter & Sort COMPLETED (Past dates, most recent first)
        const completed = events
          .filter(event => new Date(event.date) <= now)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        // 4. Determine HOME EVENT
        // Logic: Show the nearest upcoming event. If none, show the most recent completed.
        const featuredEvent = upcoming.length > 0 ? upcoming[0] : completed[0];

        setData({
          homeEvent: featuredEvent,
          upcomingEvents: upcoming,
          completedEvents: completed,
          allEvents: events
        });
        setLoading(false);

      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <EventContext.Provider value={{ ...data, loading, error }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);