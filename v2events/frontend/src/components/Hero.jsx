import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image1 from "../../src/assets/hero.jpg";
import Image2 from "../../src/assets/hero2.jpg";
import Image3 from "../../src/assets/hero3.jpg";

const HeroData = [
    { id: 1, img: Image3 },
    { id: 2, img: Image2 },
    { id: 3, img: Image1 },
];

const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
};

const Hero = () => {
    // Initial Time State
    const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 12 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        } else {
                            if (days > 0) {
                                days--;
                                hours = 23;
                                minutes = 59;
                                seconds = 59;
                            }
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Helper to add leading zeros (e.g., "9" -> "09")
    const formatTime = (time) => String(time).padStart(2, '0');

    return (
        <div className='container py-8 px-15'>
            <div className='overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center'>
                <div className="w-full h-full">
                    <Slider {...settings}>
                        {HeroData.map((data) => (
                            <div key={data.id}>
                                <div className='relative w-full h-[550px] sm:h-[650px]'>
                                    
                                    {/* Image */}
                                    <img 
                                        src={data.img} 
                                        alt="Event"
                                        className='w-full h-full object-cover'
                                    />

                                    {/* Timer Overlay */}
                                    <div className="absolute bottom-10 right-10 sm:bottom-16 sm:right-16 z-20">
                                        <div className="bg-white/90 backdrop-blur-md w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] rounded-full flex flex-col items-center justify-center shadow-2xl border-[6px] border-white/40">
                                            <div>
                                                <p className='text-[10px] sm:text-[15px] font-semibold text-gray-500 tracking-widest text-center'>Live Begins In</p>
                                            </div>
                                            {/* Timer Value: 02:14:35:12 */}
                                            <div className="text-lg sm:text-2xl font-bold text-gray-800 tracking-wider">
                                                {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:<span className='text-red-500'>{formatTime(timeLeft.seconds)}</span>
                                            </div>
                                            
                                            {/* Timer Label */}
                                            <div className="text-[15px] sm:text-[10px] font-semibold text-gray-500 uppercase mt-1 tracking-widest text-center">
                                                Day : Hr : Min : Sec
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Hero