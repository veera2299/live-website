import React from 'react';
import { useEvent } from '../contextApi/EventContext';
import EventLayout from '../components/EventLayout';

const Home = () => {
  // 1. Get the "Home Event" from your global Context
  // The context already calculates which event to show (Upcoming vs Recent)
  const { homeEvent, loading } = useEvent();

  // 2. Handle Loading State
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1e1b4b]">
        <div className="text-white font-serif text-xl animate-pulse">
           Loading Event Details...
        </div>
      </div>
    );
  }

  // 3. Handle Empty State (If database is completely empty)
  if (!homeEvent) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white">
        <h2 className="text-3xl font-serif mb-4">No Events Scheduled</h2>
        <p className="opacity-70">Please check back later for updates.</p>
      </div>
    );
  }

  // 4. Render the Reusable Layout
  // We simply pass the data down. The layout handles the design.
  return (
    <EventLayout eventData={homeEvent} />
  );
};

export default Home;