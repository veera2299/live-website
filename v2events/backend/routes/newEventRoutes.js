const express = require('express');
const router = express.Router();
const newEventController = require('../controllers/newEventController');
const verifyToken = require('../middlewares/verifyToken');

// --- ROUTES ---

// 1. ADD EVENT (POST)
// The upload middleware is already attached in the controller export
router.post('/add-event', verifyToken, newEventController.addEvent);

// 2. GET ALL EVENTS (GET)
router.get('/all-events', newEventController.getAllEvents);

// 3. GET SINGLE EVENT (GET)
router.get('/all-events/:eventId', newEventController.getEvent);

// 4. DELETE EVENT (DELETE)
// Updated path to match your frontend: /delete-event/:eventId
router.delete('/delete-event/:eventId', verifyToken, newEventController.deleteEvent);

// 5. UPDATE EVENT (PUT)
// The upload middleware is already attached in the controller export
router.put('/update-event/:id', verifyToken, newEventController.updateEvent);

// 6. VERIFY TOKEN (Utility)
router.get('/verify-token', verifyToken, (req, res) => {
    res.json({ success: true, message: "Token is valid" });
});

module.exports = router;