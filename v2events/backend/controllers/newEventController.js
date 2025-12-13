const NewEvent = require("../models/NewEvent") // Ensure this path matches your file structure
const Admin = require("../models/Admin")
const multer = require("multer")
const path = require('path');

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

const addEvent = async (req, res) => {
    try {
        const { eventName, date, time, location } = req.body;

        // CHANGE 1: Use 'req.files' (plural) instead of 'req.file'
        // We map over the array to get just the filenames
        const eventImages = req.files ? req.files.map(file => file.filename) : [];

        const admin = await Admin.findById(req.adminId);

        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        // CHANGE 2: Ensure your DB saves an array
        const newEvent = new NewEvent({
            eventName, 
            date, 
            time, 
            location, 
            eventImages // This is now an array like ['img1.jpg', 'img2.jpg']
        });

        await newEvent.save();

        return res.status(200).json({ message: "New event added successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// CHANGE 3: Use 'upload.array' instead of 'upload.single'
// 'images' is the key name you must use in Postman
// 10 is the maximum number of files allowed at once
module.exports = { addEvent: [upload.array('images', 10), addEvent] };