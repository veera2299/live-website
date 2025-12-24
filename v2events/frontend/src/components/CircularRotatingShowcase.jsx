import React from 'react';

// Sample data for the slider
const images = [
  "https://images.unsplash.com/photo-1599552683573-9dc48255b7ef?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560167016-092131bad975?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549488497-15216d56673d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516216628859-9bcce593dd4e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552084117-5635e80c9e46?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596727147705-56a9684e6191?q=80&w=600&auto=format&fit=crop",
];

const CircularRotatingShowcase = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#D2D2D2]">
      <style>{`
        /* Importing beautiful fonts: Great Vibes (Script) and Playfair Display (Serif) */
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        /* 3D Rotation Animation */
        @keyframes autoRun {
            from { transform: perspective(1000px) rotateX(-10deg) rotateY(0deg); }
            to { transform: perspective(1000px) rotateX(-10deg) rotateY(360deg); }
        }

        .animate-autoRun {
            animation: autoRun 20s linear infinite;
        }

        /* Responsive Z-Distance logic */
        :root {
            --z-distance: 550px;
        }
        @media (max-width: 1023px) {
            :root { --z-distance: 350px; }
        }
        @media (max-width: 767px) {
            :root { --z-distance: 220px; }
        }
        @media (max-width: 480px) {
            :root { --z-distance: 160px; }
        }
      `}</style>

      {/* 1. BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 pointer-events-none"
        style={{ backgroundImage: 'url("/marriage.png")' }} 
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. CENTERED TEXT "V2 EVENTS" 
          - Changed Font to 'Great Vibes'
          - Added py-24 for vertical margin
      */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none py-24">
        <div className="relative text-center">
            <h1 className="font-['Great_Vibes'] text-[15vw] lg:text-[10vw] leading-none text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] tracking-wide">
                V2 Events
            </h1>
            {/* Optional subtitle in a clean Serif font */}
            <p className="font-['Playfair_Display'] text-white/80 text-lg md:text-2xl mt-4 tracking-[0.2em] uppercase">
                Making Memories
            </p>
        </div>
      </div>

      {/* 3. 3D SLIDER SECTION */}
      <div 
        className="absolute top-[40%] md:top-[35%] lg:top-[30%]
                   left-1/2 -translate-x-1/2
                   w-[100px] md:w-[140px] lg:w-[200px] 
                   h-[140px] md:h-[180px] lg:h-[250px] 
                   z-20 [transform-style:preserve-3d] animate-autoRun pointer-events-none"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{
              transform: `rotateY(${index * (360 / images.length)}deg) translateZ(var(--z-distance))`
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