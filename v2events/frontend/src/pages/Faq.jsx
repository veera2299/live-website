import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "Why should I choose live streaming for my event?",
    answer: "Live streaming allows friends and family who cannot attend in person—whether due to distance, health, or scheduling conflicts—to be part of your special moments in real-time via YouTube. It ensures no one misses out on your big day."
  },
  {
    question: "What types of events do you stream?",
    answer: "We cover a wide range of events including Weddings, Receptions, Engagement Ceremonies, Birthday Parties, Corporate Gatherings, and Political Events. If it matters to you, we can broadcast it to the world."
  },
  {
    question: "How can I book a live streaming service?",
    answer: "Booking is simple! You can click the 'Book Now' button in the menu, send us an email at v2liveevents@gmail.com, or reach out to us directly via WhatsApp or Phone at +91 9542303831."
  },
  {
    question: "What is the Digital Guestbook?",
    answer: "The Digital Guestbook is a special feature on your event page. It allows virtual attendees to leave heartfelt messages, wishes, and blessings for you. It serves as a beautiful keepsake of everyone who watched your special day online."
  },
  {
    question: "What is the 'Order of Events'?",
    answer: "The Order of Events is a timeline displayed on your event page. It informs your virtual guests about the schedule of the day (e.g., '10:00 AM - Muhurtham', '11:30 AM - Lunch'). This ensures viewers know exactly when to tune in for key moments."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-lg md:text-xl font-['Playfair_Display'] font-medium transition-colors duration-300 ${isOpen ? 'text-[#fdc62e]' : 'text-gray-800 dark:text-gray-200 group-hover:text-[#fdc62e]'}`}>
          {question}
        </span>
        <span className={`ml-4 p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#fdc62e] text-white rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="flex justify-center mb-4">
             <div className="p-3 bg-[#fdc62e]/10 rounded-full">
                <HelpCircle size={32} className="text-[#fdc62e]" />
             </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Everything you need to know about our live streaming services. Can't find the answer you're looking for? Feel free to contact us.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 px-6 md:px-10 py-4" data-aos="fade-up" data-aos-delay="100">
          {faqData.map((item, index) => (
            <FAQItem 
              key={index} 
              question={item.question} 
              answer={item.answer} 
              isOpen={activeIndex === index} 
              onClick={() => toggleIndex(index)} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;