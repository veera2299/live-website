import React from 'react';
import { Link } from 'react-router-dom'; 
import { getCloudinaryUrl } from '../utils/imageHelper';

// 1. Accept props: title, events data, and the 'isCompleted' flag
const EventList = ({ title, events, isCompleted }) => {

  return (
    <div className="min-h-screen bg-stone-300 flex items-center justify-center font-sans py-10 rounded-xl">
      
      <div className="bg-white w-full shadow-2xl overflow-hidden p-8 md:p-12 min-h-[800px]">
        
        {/* Dynamic Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            {title}
          </h1>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Handle empty state */}
          {events.length === 0 && (
             <p className="text-gray-500 col-span-3 text-center text-xl">No events found.</p>
          )}

          {events.map((event) => {
            // Construct Image URL
            const displayImage = event.eventImages && event.eventImages.length > 0 
                ? getCloudinaryUrl(event.eventImages[0])
                : "https://via.placeholder.com/800"; // Fallback

            return (
                <div key={event._id || event.id} className="flex flex-col group">
                {/* Card Image */}
                <div className="h-80 w-full overflow-hidden rounded-t-lg mb-6 relative">
                    <img 
                    src={displayImage} 
                    alt={event.names}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Card Content */}
                <div className="flex flex-col items-start space-y-2">
                    <h3 className="font-serif text-xl text-gray-900">
                    {event.names} <br/>
                    <span className="text-base text-gray-600">
                        {new Date(event.date).toDateString()}
                    </span>
                    </h3>
                    
                    <p className="text-gray-500 text-sm font-light mb-4">
                    {event.eventName} {/* Using eventName as location/type */}
                    </p>

                    {/* Button - Using Link with Scroll to Top */}
                    <Link 
                        to={`/event/${event._id}`}
                        // ADD THIS LINE BELOW:
                        onClick={() => window.scrollTo(0, 0)}
                        className="w-full bg-[#7D6B58] hover:bg-[#685949] text-center text-white text-sm py-3 px-6 rounded-md transition-colors uppercase tracking-wide mb-6 mt-4"
                    >
                        View Details
                    </Link>

                    {/* --- LOGIC: TIMER VS STAY TUNED --- */}
                    <div className="w-full text-center pt-2 border-t border-gray-100">
                        {isCompleted ? (
                            // OPTION A: Show Completed Text
                            <div className="py-2">
                                <span className="text-green-700 font-serif italic text-lg">
                                    Successfully Completed
                                </span>
                            </div>
                        ) : (
                            // OPTION B: Show "Stay Tuned" (Replaces Timer)
                            <div className="py-2 flex flex-col items-center justify-center gap-1">
                                <span className="text-[#7D6B58] font-serif italic text-xl tracking-wide">
                                    Coming Soon...
                                </span>
                                <span className="text-gray-400 text-[10px] uppercase tracking-widest">
                                    Stay Tuned
                                </span>
                            </div>
                        )}
                    </div>

                </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventList;