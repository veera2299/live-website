import React from 'react';
import { useEvent } from '../contextApi/EventContext';
import EventList from '../components/EventList';

const Completed = () => {
  // 1. Get the bucketed data
  const { completedEvents, loading } = useEvent();

  if (loading) return <div>Loading...</div>;

  return (
    <EventList 
        title="Past Events Archive" 
        events={completedEvents} 
        isCompleted={true} // <--- Shows "Successfully Completed" text
    />
  );
};

export default Completed;