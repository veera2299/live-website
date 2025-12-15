const express = require('express')
const newEventController = require('../controllers/newEventController');
const verifyToken = require('../middlewares/verifyToken')
const multer = require('multer')
const path = require('path')

const router = express.Router();

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Files will be saved in the 'uploads' directory
        // IMPORTANT: You must manually create a folder named 'uploads' in your project root
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        // Generate a unique filename: fieldname + timestamp + extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// --- File Filter (Optional but Recommended) ---
// Restrict uploads to images only (jpeg, jpg, png, webp)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Images Only!'));
    }
};

// --- Initialize Multer ---
const upload = multer({
    storage: storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: fileFilter
});


router.post('/add-event', verifyToken, newEventController.addEvent);
router.delete('/:eventId', verifyToken, newEventController.deleteEvent);
router.get('/all-events', newEventController.getAllEvents);
router.get('/all-events/:eventId', newEventController.getEvent);



// router.get('/uploads/:imageName', (req, res)=> {
//     const imageName = req.params.imageName;
//     res.headersSent('Content-Type', 'image/jpeg');
//     res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
// })



router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);

    // res.sendFile automatically sets the Content-Type based on the file extension
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send("Image not found");
        }
    });
});


// UPDATE ROUTE
// We use 'upload.array' to allow adding new files
router.put(
    '/update-event/:id', 
    verifyToken, 
    upload.array('images', 10), // Allow up to 10 new images
    newEventController.updateEvent
);




module.exports = router;