import React, { useState, useEffect } from 'react';
import { useEvent } from '../contextApi/EventContext';

import { getCloudinaryUrl } from '../utils/imageHelper';
import { LoveEffect, BirthdayEffect } from './effects/EventEffects';


// 1. Update component to accept props
const CircularRotatingShowcase = ({ eventData: propEventData }) => {
  const { homeEvent, loading: contextLoading } = useEvent();

  // 2. Determine which data to use (Prop takes priority over Context)
  const eventData = propEventData || homeEvent;
  
  // 3. Handle Loading: If context is loading OR if we have no data yet
  const isLoading = contextLoading || !eventData;

  // 4. State for Timer & Live Status
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  // 5. Timer Logic 
  useEffect(() => {
    // Safety check: if no data, stop here
    if (!eventData?.date) return;

    const targetDate = new Date(eventData.date);

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setIsLive(false); // Event hasn't started
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        setIsLive(true); // Event is Live
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventData]); // Re-run if eventData changes

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Loading State
  if (isLoading) return <div className="h-screen flex items-center justify-center text-white bg-[#1e1b4b]">Loading Visuals...</div>;

  // Image Logic

  const displayImages = (eventData.eventImages && eventData.eventImages.length > 0)
    ? eventData.eventImages.map(img => getCloudinaryUrl(img))
    : ["https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"]; 

  // Dynamic Color Logic (Default to white)
  const textColor = eventData.textColor || 'white'; 



// --- HELPER 1: CHOOSE BACKGROUND EFFECT ---
const getEventTheme = (name) => {
  if (!name) return null;
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('marriage') || lowerName.includes('wedding') || lowerName.includes('reception') || lowerName.includes('engagement')) {
    return <LoveEffect />;
  }
  
  if (lowerName.includes('birthday') || lowerName.includes('party') || lowerName.includes('born')) {
    return <BirthdayEffect />;
  }
  return null;
};

// --- HELPER 2: FORMAT TEXT CONTENT ---
const renderCentralContent = () => {
  const eventType = (eventData.eventName || "").toLowerCase();
  const rawNames = eventData.names || "V2 Events";

  // Split names by common separators. Result ex: ["Ram", "&", "Sita"]
  const splitArr = rawNames.split(/(\s+&\s+|\s+and\s+|\s+weds\s+|\s+\+\s+)/i);
  const name1 = splitArr[0] || rawNames;
  const name2 = splitArr[2] || ""; // Index 2 because Index 1 is the separator

  // 1. MARRIAGE (Name weds Name)
  if (eventType.includes('marriage') || eventType.includes('wedding')) {
    return (
      <div className="flex flex-col items-center leading-none">
        <h1 className="font-['Great_Vibes'] text-[12vw] lg:text-[8vw] drop-shadow-md text-pink-100">
          {name1}
        </h1>
        <span className="font-['Playfair_Display'] text-xl md:text-3xl italic text-rose-300 my-2 tracking-[0.3em] opacity-90 uppercase">
          — weds —
        </span>
        <h1 className="font-['Great_Vibes'] text-[12vw] lg:text-[8vw] drop-shadow-md text-pink-100">
          {name2 || "Partner"}
        </h1>
      </div>
    );
  }

  // 2. RECEPTION / ENGAGEMENT (Name & Name)
  if (eventType.includes('reception') || eventType.includes('engagement')) {
    return (
      <div className="flex flex-col items-center leading-none">
        <h1 className="font-['Great_Vibes'] text-[12vw] lg:text-[8vw] drop-shadow-md">
          {name1}
        </h1>
        <span className="font-['Playfair_Display'] text-4xl md:text-6xl text-yellow-300 my-1 font-bold opacity-80">
          &amp;
        </span>
        <h1 className="font-['Great_Vibes'] text-[12vw] lg:text-[8vw] drop-shadow-md">
          {name2}
        </h1>
      </div>
    );
  }

  // 3. BIRTHDAY (Happy Birthday Name)
  if (eventType.includes('birthday')) {
    return (
      <div className="flex flex-col items-center leading-none">
        <span className="font-['Playfair_Display'] text-lg md:text-2xl tracking-[0.2em] uppercase text-yellow-200 mb-2">
          Happy Birthday
        </span>
        <h1 className="font-['Great_Vibes'] text-[14vw] lg:text-[10vw] drop-shadow-lg text-white">
          {rawNames}
        </h1>
        <span className="text-4xl mt-2 animate-bounce">🎂</span>
      </div>
    );
  }

  // 4. HALF SAREE / CEREMONIES
  if (eventType.includes('half saree') || eventType.includes('saree') || eventType.includes('dhoti')) {
    return (
      <div className="flex flex-col items-center leading-none">
        <span className="font-['Playfair_Display'] text-sm md:text-xl tracking-widest text-pink-200 mb-2 italic">
          Chi. La. Sow.
        </span>
        <h1 className="font-['Great_Vibes'] text-[13vw] lg:text-[9vw] drop-shadow-md text-white">
          {rawNames}
        </h1>
        <span className="font-['Playfair_Display'] text-xs md:text-lg tracking-[0.3em] uppercase text-pink-200 mt-2 border-t border-pink-200/50 pt-2">
          Ceremony
        </span>
      </div>
    );
  }

  // 5. DEFAULT (Just the Name)
  return (
    <div className="text-center">
      <h1 className="font-['Great_Vibes'] text-[15vw] lg:text-[10vw] leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] tracking-wide">
         {rawNames}
      </h1>
      {/* Optional: Add subtitle for Political/Other events */}
      {(eventType.includes('political') || eventType.includes('meeting')) && (
         <p className="font-['Playfair_Display'] text-lg tracking-widest text-orange-400 mt-2 uppercase">
            Grand Welcome
         </p>
      )}
    </div>
  );
};




  return (
    <div className="relative overflow-hidden bg-[#D2D2D2] rounded-2xl m-4 md:m-8 h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        
        @keyframes autoRun {
            from { transform: perspective(1000px) rotateX(-10deg) rotateY(0deg); }
            to { transform: perspective(1000px) rotateX(-10deg) rotateY(360deg); }
        }
        .animate-autoRun { animation: autoRun 20s linear infinite; }
        
        /* Pulse Animation for Live Button */
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); transform: scale(1); }
            50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.8); transform: scale(1.05); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }

        :root { --z-distance: 550px; }
        @media (max-width: 1023px) { :root { --z-distance: 350px; } }
        @media (max-width: 767px) { :root { --z-distance: 220px; } }
        @media (max-width: 480px) { :root { --z-distance: 160px; } }
      `}</style>

      {/* 1. BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 pointer-events-none transition-all duration-1000 rounded-2xl"
        style={{ backgroundImage: `url("${displayImages[0]}")` }} 
      >
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/30 via-black/40 to-black/70 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. TIMER / LIVE SECTION */}
      <div className="absolute top-0 left-0 w-full z-30 flex flex-col items-center pt-8 md:pt-10" style={{ color: textColor }}>
        
        {!isLive ? (
            // --- OPTION A: SHOW TIMER ---
            <>
                <h2 className="font-['Playfair_Display'] text-sm md:text-xl uppercase tracking-[0.3em] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Live Begins In
                </h2>
                
                <div className="flex gap-4 md:gap-8 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-['Playfair_Display'] font-bold">
                            {formatTime(timeLeft.days)}
                        </span>
                        <span className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest mt-1">Days</span>
                    </div>
                    
                    <span className="text-xl md:text-3xl opacity-70 font-serif mt-1">:</span>

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-['Playfair_Display'] font-bold">
                            {formatTime(timeLeft.hours)}
                        </span>
                        <span className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest mt-1">Hours</span>
                    </div>

                    <span className="text-xl md:text-3xl opacity-70 font-serif mt-1">:</span>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-['Playfair_Display'] font-bold">
                            {formatTime(timeLeft.minutes)}
                        </span>
                        <span className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest mt-1">Mins</span>
                    </div>

                    <span className="text-xl md:text-3xl opacity-70 font-serif mt-1">:</span>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-['Playfair_Display'] font-bold w-[40px] md:w-[60px]">
                            {formatTime(timeLeft.seconds)}
                        </span>
                        <span className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest mt-1">Sec</span>
                    </div>
                </div>
            </>
        ) : (
            // --- OPTION B: SHOW LIVE BUTTON ---
            <div className="py-2 flex flex-col items-center justify-center animate-fade-in">
                 <button 
                    onClick={() => {
                        document.getElementById('live-player')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group flex items-center gap-4 transition-transform duration-500 hover:scale-105"
                 >
                    {/* The Pulsing Red Dot */}
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_15px_#ef4444]"></span>
                    </span>

                    {/* The Text */}
                    <span className="text-white font-['Playfair_Display'] text-2xl md:text-4xl tracking-[0.2em] uppercase font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        Watch Live
                    </span>
                 </button>
            </div>
        )}
      </div>




      {/* 3. CENTERED TEXT (DYNAMIC) */}
<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none py-24">
{/* Keep 'mt-20' for mobile (so it stays up). Change 'md:mt-0' to 'md:mt-32' for desktop only. */}
<div className="relative text-center mt-20 md:mt-32 group" style={{ color: textColor }}>
      
      {/* 1. CALL THE BACKGROUND EFFECT */}
      {getEventTheme(eventData.eventName)}
      
      {/* 2. CALL THE TEXT FORMATTER */}
      {renderCentralContent()}
      
  </div>
</div>



      {/* 4. 3D SLIDER SECTION */}
      <div 
        className="absolute top-[45%] md:top-[35%] lg:top-[30%]
                   left-1/2 -translate-x-1/2
                   w-[100px] md:w-[140px] lg:w-[200px] 
                   h-[140px] md:h-[180px] lg:h-[250px] 
                   z-20 [transform-style:preserve-3d] animate-autoRun pointer-events-none"
      >
        {displayImages.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{
              transform: `rotateY(${index * (360 / displayImages.length)}deg) translateZ(var(--z-distance))`
            }}
          >
            <img 
              src={src} 
              alt={`img ${index + 1}`} 
              className="w-full h-full object-cover rounded-lg shadow-2xl border border-white/50" 
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default CircularRotatingShowcase;