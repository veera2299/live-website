import React from 'react';

// 1. Accept timeline as a prop
const Timeline = ({ timeline }) => {

  // 2. Safety Check: If no timeline data, don't render anything
  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    // UPDATED CLASSNAME BELOW:
    // 1. Removed 'w-full' (to prevent scrollbars with margins)
    // 2. Added 'm-4 md:m-8' (Responsive Spacing like Showcase)
    // 3. Added 'rounded-2xl' (Rounded corners like Showcase)
    <div className="relative py-16 bg-[#1e1b4b] overflow-hidden text-white/90 font-['Playfair_Display'] m-4 md:m-8 rounded-2xl">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 relative">
             <h2 className="text-3xl md:text-5xl tracking-widest uppercase drop-shadow-lg text-white inline-block">
               Order of Events
             </h2>
             <div className="w-24 h-1 bg-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-pink-400/50 to-transparent"></div>

          {timeline.map((event, index) => (
            <div key={index} className={`relative flex items-center mb-12 md:mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for Desktop Alignment */}
              <div className="hidden md:block w-1/2"></div>
              
              {/* Center Dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] z-10 border-2 border-white"></div>

              {/* Event Card */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-10">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
                  {/* Time */}
                  <span className="block text-sm font-sans text-pink-300 tracking-wider mb-2 font-bold uppercase">
                    {event.time}
                  </span>
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white group-hover:text-pink-200 transition-colors">
                    {event.title}
                  </h3>
                  {/* Description */}
                  {event.description && (
                      <p className="text-sm md:text-base font-sans text-gray-300 leading-relaxed">
                        {event.description}
                      </p>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Timeline;