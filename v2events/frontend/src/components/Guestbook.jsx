import React, { useState } from 'react';

// Sample initial data
const initialMessages = [
  { id: 1, name: "V2 Events", message: "Wishing you both a lifetime of love and happiness!", date: "Just now" },
  { id: 2, name: "Mike & Jenny", message: "Congratulations!! The ceremony looks beautiful.", date: "2 mins ago" },
  { id: 3, name: "The Thompson Family", message: "Cheers to the happy couple! 🥂", date: "5 mins ago" },
];

const Guestbook = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);

    // Simulate network delay for effect
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        name: formData.name,
        message: formData.message,
        date: "Just now"
      };

      setMessages([newMessage, ...messages]);
      setFormData({ name: '', message: '' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans m-4 md:m-8 rounded-2xl overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] tracking-wider mb-4">
            Guestbook
          </h2>
          <p className="text-gray-400 font-light text-lg">
            Leave a note for the couple to read later.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 1. INPUT FORM (Sticky on Desktop) */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-['Playfair_Display'] mb-6 text-pink-200">
                  Write a Wish
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Uncle Bob"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Share your love..."
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium py-3 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Love'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* 2. MESSAGES GRID */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors duration-300"
                >
                  <p className="text-gray-300 italic mb-6 leading-relaxed">
                    "{msg.message}"
                  </p>
                  <div className="flex justify-between items-end border-t border-white/10 pt-4">
                    <div>
                      <h4 className="font-['Playfair_Display'] text-lg text-pink-100">
                        {msg.name}
                      </h4>
                    </div>
                    <span className="text-xs text-gray-500">{msg.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Guestbook;