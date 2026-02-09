import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Trash2, User, Clock, MessageSquare } from 'lucide-react';

const GuestBookMessages = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = "http://localhost:4000/admin"; 

    // 1. Fetch Messages for this Event
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_BASE}/messages/${eventId}`);
                if (response.data && response.data.messages) {
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [eventId]);

    // 2. Delete Handler
    const handleDelete = async (msgId) => {
        if (!window.confirm("Are you sure you want to delete this message? This cannot be undone.")) return;

        try {
            // Call the DELETE API we created in Step 1
            await axios.delete(`${API_BASE}/message/${msgId}`);
            
            // Remove from UI immediately
            setMessages(messages.filter(msg => msg._id !== msgId));
            alert("Message deleted successfully");
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Failed to delete message");
        }
    };

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="p-8 w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button 
                        onClick={() => navigate('/admin/guestbook')} 
                        className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600"/>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Manage Messages</h1>
                        <p className="text-sm text-gray-500">Review and moderate guest wishes</p>
                    </div>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium">
                    Total Messages: {messages.length}
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No messages found for this event yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            
                            {/* Message Details */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center text-indigo-700 font-semibold text-sm bg-indigo-50 px-2 py-1 rounded">
                                        <User size={14} className="mr-1" />
                                        {msg.name}
                                    </div>
                                    <div className="flex items-center text-gray-400 text-xs">
                                        <Clock size={12} className="mr-1" />
                                        {formatDate(msg.displayDate || msg.createdAt)}
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    "{msg.message}"
                                </p>
                            </div>

                            {/* Actions */}
                            <button 
                                onClick={() => handleDelete(msg._id)}
                                className="flex items-center px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                            >
                                <Trash2 size={16} className="mr-2" />
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GuestBookMessages;