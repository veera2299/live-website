import React from 'react';
import { useEvent } from '../contextApi/EventContext';
import EventList from '../components/EventList'; // Import the reusable component

const Upcoming = () => {
  // 1. Get the bucketed data from your Context
  const { upcomingEvents, loading } = useEvent();

  if (loading) return <div>Loading...</div>;

  return (
    <EventList 
        title="Upcoming Live Streams Schedule" 
        events={upcomingEvents} 
        isCompleted={false} // <--- Shows Timer
    />
  );
};

export default Upcoming;