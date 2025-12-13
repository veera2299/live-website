import React from 'react';

const Card = () => {
  // Data for the events to keep the JSX clean
  const events = [
    {
      id: 1,
      names: "Aisha & Ravi",
      date: "Oct 26, 2024",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      names: "Jordan & Chris",
      date: "Nov 9, 2024",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      names: "Mei Ling & Daiki",
      date: "Dec 21, 2024",
      location: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1623773602128-4663d9173c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    // Removed padding (p-4) to allow full width
    <div className="min-h-screen bg-stone-300 flex items-center justify-center font-sans">
      
      {/* Main White Container Changes: 
          1. Removed 'max-w-6xl' -> Now occupies available width
          2. Removed 'rounded-[2.5rem]' -> Now square corners
      */}
      <div className="bg-white w-full shadow-2xl overflow-hidden p-8 md:p-12 min-h-[800px]">
        
        {/* Hero Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            Upcoming Live Streams <br /> Schedule
          </h1>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col">
              {/* Card Image */}
              <div className="h-80 w-full overflow-hidden rounded-t-lg mb-6 relative">
                 {/* Using standard img tag, replace with Next/Image if using Next.js */}
                <img 
                  src={event.image} 
                  alt={`${event.names} wedding`}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col items-start space-y-2">
                <h3 className="font-serif text-xl text-gray-900">
                  {event.names} - <br/>
                  {event.date}
                </h3>
                
                <p className="text-gray-500 text-sm font-light mb-4">
                  {event.location}
                </p>

                {/* RSVP Button */}
                <button className="w-full bg-[#7D6B58] hover:bg-[#685949] text-white text-sm py-3 px-6 rounded-md transition-colors uppercase tracking-wide mb-6 mt-4">
                  View Details
                </button>

                {/* Countdown Timer (Static placeholder) */}
                <div className="w-full text-center pt-2">
                  <div className="text-gray-900 font-medium text-lg tracking-widest">
                    00:00:00
                  </div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider">
                    Days • Hours
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;