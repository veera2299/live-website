import React, { useState } from 'react';

const Play = () => {
  // 1. State to track if the video is playing
  const [isPlaying, setIsPlaying] = useState(false);

//   https://www.youtube.com/live/nslH8rxDJcI?si=upXR7aIXu89036f1

  // 2. Put your YouTube Video ID here (e.g., live stream ID)
  const videoId = "nslH8rxDJcI"; 

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className='w-full bg-white dark:bg-gray-900 py-12' id='live-player'>
      <div className='container mx-auto px-4'>
        
        <div className='flex flex-col items-center justify-center'>
            
            {/* Heading Section */}
            <div className="mb-10 text-center relative">
                <h2 className="text-4xl md:text-5xl font-serif text-gray-800 dark:text-white tracking-widest uppercase relative inline-block">
                    Watch Live
                    {/* Decorative line underneath */}
                    <span className="block h-[2px] w-24 bg-gray-800 dark:bg-white mx-auto mt-4 opacity-50"></span>
                </h2>
            </div>

            {/* Video Container */}
            <div className='relative w-full max-w-[900px] aspect-video bg-black rounded-xl shadow-2xl overflow-hidden group border border-gray-200 dark:border-gray-800'>
                
                {!isPlaying ? (
                    /* STATE 1: Custom Placeholder */
                    <div 
                        onClick={handlePlay}
                        className="w-full h-full cursor-pointer relative"
                    >
                        {/* Background Thumbnail */}
                        <img 
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                            alt="Thumbnail" 
                            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-90 transition-opacity duration-300"
                        />

                        {/* Centered Play Button Overlay */}
                        <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
                            <div className='w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-110'>
                                {/* Triangle Icon */}
                                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                            </div>
                            <p className='text-white text-sm font-medium tracking-[0.2em] uppercase mt-6 drop-shadow-md'>
                                Click to Join Stream
                            </p>
                        </div>
                    </div>
                ) : (
                    /* STATE 2: The Actual YouTube Video */
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title="Live Stream"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}

            </div>

        </div>
      </div>
    </div>
  );
};

export default Play;