// components/EventLayout.jsx
import React from 'react';
import CircularRotatingShowcase from './CircularRotatingShowcase';
import Play from './Play';
import Timeline from './Timeline';
import Guestbook from './Guestbook';
import { HeartSeparator, DiamondSeparator } from './Separator';

const EventLayout = ({ eventData }) => {
  // 1. Safety Check: If data isn't loaded yet, return null or loader
  if (!eventData) return <div className="text-white text-center mt-20">Loading Event...</div>;

  // --- LOGIC 1: TIMELINE CHECK ---
  // Only show if timeline array exists AND has at least one item
  const showTimeline = eventData.timeline && eventData.timeline.length > 0;

  // --- LOGIC 2: GUESTBOOK CHECK ---
  // We normalize the name to lowercase so "Marriage" and "marriage" both work.
  const eventType = eventData.eventName ? eventData.eventName.toLowerCase() : "";
  
  // Whitelist: These events WILL show the guestbook. 
  // Everything else (Yoga Day, Political Meeting, etc.) will skip it.
  const guestbookAllowedTypes = ["marriage", "wedding", "reception", "birthday", "engagement", "sangeet", "haldi"];
  
  // Check if our eventType contains any of the allowed words
  const showGuestbook = guestbookAllowedTypes.some(type => eventType.includes(type));

  return (
    <div className=" min-h-screen">
      
      {/* 1. HERO SECTION (Always Show) */}
      {/* UPDATE: Added eventData prop here */}
      <CircularRotatingShowcase eventData={eventData} />
      
      {/* Separator */}
      <HeartSeparator />

      {/* 2. VIDEO PLAYER (Always Show) */}
      {/* Pass ytCode explicitly */}
      <Play ytCode={eventData.ytCode} />

      {/* 3. TIMELINE SECTION (Conditional) */}
      {showTimeline && (
        <>
          <DiamondSeparator />
          {/* We pass the timeline array directly to the component */}
          <Timeline timeline={eventData.timeline} />
        </>
      )}

      {/* 4. GUESTBOOK SECTION (Conditional) */}
      {showGuestbook && (
        <>
          <HeartSeparator />
          <Guestbook eventId={eventData._id} />
        </>
      )}

      {/* Bottom Padding */}
      <div className="pb-20"></div>
    </div>
  );
};

export default EventLayout;