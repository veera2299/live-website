import React from 'react';

// STYLE 1: The Romantic Heart (Compact)
export const HeartSeparator = () => {
  return (
    // Changed py-12 to py-6, removed bg color
    <div className="w-full flex items-center justify-center py-6">
      <div className="w-1/4 h-[1px] bg-gradient-to-r from-transparent to-pink-500/50"></div>
      
      <div className="mx-4 text-pink-500 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </div>

      <div className="w-1/4 h-[1px] bg-gradient-to-l from-transparent to-pink-500/50"></div>
    </div>
  );
};
// STYLE 2: The Elegant Diamond (Fixed Visibility)
export const DiamondSeparator = () => {
    return (
      <div className="w-full flex items-center justify-center py-8">
          <div className="relative flex items-center justify-center">
              {/* Left Line: Gradient to Purple */}
              <span className="block w-24 md:w-48 h-[1px] bg-gradient-to-r from-transparent to-purple-500/60"></span>
              
              {/* Center Diamond: Pink Color */}
              <span className="mx-4 text-xl text-pink-600 font-serif drop-shadow-sm">
                  ❖
              </span>
  
              {/* Right Line: Gradient from Purple */}
              <span className="block w-24 md:w-48 h-[1px] bg-gradient-to-l from-transparent to-purple-500/60"></span>
          </div>
      </div>
    );
  };
// STYLE 3: Simple Gradient Fade (Very Compact)
export const SimpleSeparator = () => {
    return (
        // Changed py-10 to py-4, removed bg color
        <div className="w-full flex justify-center py-4">
            <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
        </div>
    )
}