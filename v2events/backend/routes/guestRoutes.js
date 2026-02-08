const express = require('express');
const router = express.Router();
const GuestMessage = require('../models/GuestMessage');

// 1. POST: Add a message (Now requires eventId)
router.post('/add-message', async (req, res) => {
    try {
        // Get eventId from the body
        const { name, message, eventId } = req.body; 

        if (!name || !message || !eventId) {
            return res.status(400).json({ error: "Name, Message, and Event ID are required" });
        }

        const newMessage = new GuestMessage({ 
            name, 
            message, 
            eventId // Save the link
        });
        
        await newMessage.save();

        res.status(200).json({ success: true, message: "Message signed!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// 2. GET: Retrieve messages for a SPECIFIC Event
// URL will look like: /guest/messages/65d4a... (The Event ID)
router.get('/messages/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;

        // Find messages where eventId matches
        const messages = await GuestMessage.find({ eventId: eventId })
                                         .sort({ displayDate: -1 });
        
        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;