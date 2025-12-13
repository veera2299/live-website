import React, { useState } from 'react';

const Play = () => {
  // 1. State to track if the video is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // 2. Put your YouTube Video ID here (e.g., "dQw4w9WgXcQ" or live stream ID)
  const videoId = "7zEqrXp83e0"; // Lofi Girl Live example

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className='w-full bg-white dark:bg-gray-900 py-12'>
      <div className='container mx-auto px-4'>
        
        <div className='flex flex-col items-center justify-center'>
            
            {/* Video Container */}
            <div className='relative w-full max-w-[700px] aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden group'>
                
                {!isPlaying ? (
                    /* STATE 1: Custom Placeholder (The Design) */
                    <div 
                        onClick={handlePlay}
                        className="w-full h-full cursor-pointer relative"
                    >
                        {/* Optional: Background Image (Thumbnail) */}
                        <img 
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                            alt="Thumbnail" 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300"
                        />

                        {/* Centered Play Button Overlay */}
                        <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
                            <div className='w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110'>
                                {/* Triangle Icon */}
                                <div className="w-0 h-0 border-t-10 border-t-transparent border-l-20 border-l-black border-b-10 border-b-transparent ml-2"></div>
                            </div>
                            <p className='text-white text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mt-6 drop-shadow-md'>
                                Live Stream Embed
                            </p>
                        </div>
                    </div>
                ) : (
                    /* STATE 2: The Actual YouTube Video */
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}

            </div>

            {/* Guest Message */}
            <div className='mt-8 bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700 px-6 py-3 rounded-full transform transition-all hover:-translate-y-1'>
                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-300'>
                    <span className='font-bold text-gray-800 dark:text-white'>Jane Doe (Guest):</span> We are so happy for you two!
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Play;