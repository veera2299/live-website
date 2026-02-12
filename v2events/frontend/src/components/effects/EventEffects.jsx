import { Heart, PartyPopper, Star, Cake,  Gift, Sparkles } from 'lucide-react';

const LoveEffect = () => (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
      <div className="absolute -top-12 -left-8 md:-left-16 text-red-500 animate-bounce duration-[2000ms]">
        <Heart size={48} fill="currentColor" className="opacity-80" />
      </div>
      <div className="absolute -top-8 right-1/4 text-pink-400 animate-pulse">
        <Heart size={24} fill="currentColor" className="opacity-60" />
      </div>
      <div className="absolute -bottom-4 -right-8 md:-right-12 text-rose-500 animate-bounce duration-[3000ms]">
        <Heart size={56} fill="currentColor" className="opacity-80" />
      </div>
    </div>
  );
  
  const BirthdayEffect = () => (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
      
      {/* --- CORNER ELEMENTS --- */}
      
      {/* Top Left: The Popper */}
      <div className="absolute -top-12 -left-8 md:-left-12 text-yellow-500 animate-bounce duration-[2000ms]">
        <PartyPopper size={56} />
      </div>
  
      {/* Top Right: Sparkle Cluster */}
      <div className="absolute -top-8 -right-4 md:-right-8 flex gap-2">
        <Sparkles size={32} className="text-yellow-400 animate-pulse duration-1000" />
        <Star size={20} fill="currentColor" className="text-blue-300 animate-spin-slow mt-4 opacity-80" />
      </div>
  
      {/* Bottom Right: The Cake */}
      <div className="absolute -bottom-4 -right-6 md:-right-10 text-pink-500 animate-bounce duration-[3000ms]">
        <Cake size={48} />
      </div>
  
      {/* Bottom Left: Gift Box (New!) */}
      <div className="absolute -bottom-2 -left-6 md:-left-10 text-purple-500 animate-pulse duration-[4000ms]">
        <Gift size={40} />
      </div>
  
      {/* --- FLOATING CONFETTI DOTS --- */}
      <div className="absolute top-1/4 left-0 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce duration-1000 opacity-50"></div>
      <div className="absolute bottom-1/3 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60"></div>
  
    </div>
  );

  export {LoveEffect, BirthdayEffect}