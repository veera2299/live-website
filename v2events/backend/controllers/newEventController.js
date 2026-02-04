const NewEvent = require("../models/NewEvent") // Ensure this path matches your file structure
const Admin = require("../models/Admin")
const multer = require("multer")
const path = require('path');
const fs = require('fs');

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
        const { eventName, names, ytCode, date, time, location, timeline } = req.body;

        // CHANGE 1: Use 'req.files' (plural) instead of 'req.file'
        // We map over the array to get just the filenames
        const eventImages = req.files ? req.files.map(file => file.filename) : [];

        // If data comes as FormData, 'timeline' is a string like '[{"time":"..."}]'
        // We need to parse it back to JSON.
        let formattedTimeline = [];
        if (timeline) {
            try {
                // Check if it's already an object (JSON request) or string (FormData)
                formattedTimeline = typeof timeline === 'string' ? JSON.parse(timeline) : timeline;
            } catch (error) {
                return res.status(400).json({ message: "Invalid timeline format" });
            }
        }

        const admin = await Admin.findById(req.adminId);

        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        // CHANGE 2: Ensure your DB saves an array
        const newEvent = new NewEvent({
            eventName, 
            names,
            ytCode,
            date, 
            time, 
            location, 
            eventImages, // This is now an array like ['img1.jpg', 'img2.jpg']
            timeline: formattedTimeline // Save the parsed array
        });

        await newEvent.save();

        return res.status(200).json({ message: "New event added successfully", success: "true"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getAllEvents = async (req, res) =>{

    try {
        const allEvents = await NewEvent.find();
      res.status(200).json({allEvents})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
    
}

const getEvent = async(req, res)=>{
    try {
        const eventId = req.params.eventId;
        const event = await NewEvent.findById(eventId);
        if(!event){
            return res.status(404).json({error: "event not found"});
        }
        res.status(200).json({event});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const deleteEvent = async(req, res)=>{

    try {
        const eventId = req.params.eventId;
        const event = await NewEvent.findById(eventId);
        if (!event) {
            return res.json({ success: false, message: "Event not found" });
        }
        
       // 2. Delete images from the 'uploads' folder
       if (event.eventImages && event.eventImages.length > 0) {
        event.eventImages.forEach((imageName) => {
            // Construct the full path to the file
            // Adjust 'uploads' if your folder is nested differently (e.g., 'public/uploads')
            const filePath = path.join(__dirname, '../uploads', imageName); 

            // Check if file exists, then delete it
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image: ${imageName}`, err);
                    // We continue even if one image fails to delete
                } else {
                    console.log(`Successfully deleted: ${imageName}`);
                }
            });
        });
    }

    // 3. Delete the event from the Database
    await NewEvent.findByIdAndDelete(eventId);

    res.json({ success: true, message: "Event and associated images deleted successfully" });

} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting event" });
}
};


const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, names, ytCode, date, time, location } = req.body;

        // 1. Process New Images (if any)
        let newImageFilenames = [];
        if (req.files && req.files.length > 0) {
            newImageFilenames = req.files.map(file => file.filename);
        }

        // 2. Build the Update Object
        // We use MongoDB operators: $set for text, $push for arrays
        const updateData = {
            $set: {
                eventName,
                names,
                ytCode,
                date,
                time,
                location
            }
        };

        // Only add the $push operator if there are actually new images
        if (newImageFilenames.length > 0) {
            updateData.$push = { 
                eventImages: { $each: newImageFilenames } 
            };
        }

        // 3. Perform the Update
        const updatedEvent = await NewEvent.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent,
            success: "true"
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// CHANGE 3: Use 'upload.array' instead of 'upload.single'
// 'images' is the key name you must use in Postman
// 10 is the maximum number of files allowed at once

module.exports = { addEvent: [upload.array('images', 10), addEvent], getAllEvents, getEvent, deleteEvent, updateEvent };