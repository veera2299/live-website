const express = require('express')
const newEventController = require('../controllers/newEventController');
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.post('/add-event', verifyToken, newEventController.addEvent);

module.exports = router;