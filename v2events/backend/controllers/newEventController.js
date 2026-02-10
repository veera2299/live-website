// const NewEvent = require("../models/NewEvent") // Ensure this path matches your file structure
// const Admin = require("../models/Admin")
// const multer = require("multer")
// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs').promises;

// // --- Multer Storage Configuration ---
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Files will be saved in the 'uploads' directory
//         // IMPORTANT: You must manually create a folder named 'uploads' in your project root
//         // cb(null, './uploads');
//         cb(null, path.join(__dirname, '../uploads'));
//     },
//     filename: function (req, file, cb) {
//         // Generate a unique filename: fieldname + timestamp + extension
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // --- File Filter (Optional but Recommended) ---
// // Restrict uploads to images only (jpeg, jpg, png, webp)
// const fileFilter = (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|webp/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Error: Images Only!'));
//     }
// };

// // --- Initialize Multer ---
// const upload = multer({
//     storage: storage,
//     // limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//     fileFilter: fileFilter
// });

// const addEvent = async (req, res) => {
//     try {
//         const { eventName, names, ytCode, date, time, location, timeline } = req.body;


//         // CHANGE 1: Use 'req.files' (plural) instead of 'req.file'
//         // We map over the array to get just the filenames
//         const eventImages = req.files ? req.files.map(file => file.filename) : [];

//         // If data comes as FormData, 'timeline' is a string like '[{"time":"..."}]'
//         // We need to parse it back to JSON.
//         let formattedTimeline = [];
//         if (timeline) {
//             try {
//                 // Check if it's already an object (JSON request) or string (FormData)
//                 formattedTimeline = typeof timeline === 'string' ? JSON.parse(timeline) : timeline;
//             } catch (error) {
//                 return res.status(400).json({ message: "Invalid timeline format" });
//             }
//         }

//         const admin = await Admin.findById(req.adminId);

//         if (!admin) {
//             return res.status(404).json({ message: "admin not found" });
//         }

//         // CHANGE 2: Ensure your DB saves an array
//         const newEvent = new NewEvent({
//             eventName, 
//             names,
//             ytCode,
//             date, 
//             time, 
//             location, 
//             eventImages, // This is now an array like ['img1.jpg', 'img2.jpg']
//             timeline: formattedTimeline // Save the parsed array
//         });

//         await newEvent.save();

//         return res.status(200).json({ message: "New event added successfully", success: "true"});

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// }

// const getAllEvents = async (req, res) =>{

//     try {
//         const allEvents = await NewEvent.find();
//       res.status(200).json({allEvents})
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
    
// }

// const getEvent = async(req, res)=>{
//     try {
//         const eventId = req.params.eventId;
//         const event = await NewEvent.findById(eventId);
//         if(!event){
//             return res.status(404).json({error: "event not found"});
//         }
//         res.status(200).json({event});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// }

// const deleteEvent = async(req, res)=>{

//     try {
//         const eventId = req.params.eventId;
//         const event = await NewEvent.findById(eventId);
//         if (!event) {
//             return res.json({ success: false, message: "Event not found" });
//         }
        
//        // 2. Delete images from the 'uploads' folder
//        if (event.eventImages && event.eventImages.length > 0) {
//         event.eventImages.forEach((imageName) => {
//             // Construct the full path to the file
//             // Adjust 'uploads' if your folder is nested differently (e.g., 'public/uploads')
//             const filePath = path.join(__dirname, '../uploads', imageName); 

//             // Check if file exists, then delete it
//             fs.unlink(filePath, (err) => {
//                 if (err) {
//                     console.error(`Failed to delete image: ${imageName}`, err);
//                     // We continue even if one image fails to delete
//                 } else {
//                     console.log(`Successfully deleted: ${imageName}`);
//                 }
//             });
//         });
//     }

//     // 3. Delete the event from the Database
//     await NewEvent.findByIdAndDelete(eventId);

//     res.json({ success: true, message: "Event and associated images deleted successfully" });

// } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error deleting event" });
// }
// };


// // const updateEvent = async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         let { eventName, names, ytCode, date, time, location, timeline, imagesToDelete } = req.body;

// //         // --- 1. PARSE COMPLEX DATA ---
// //         let formattedTimeline = undefined;
// //         if (timeline) {
// //             try {
// //                 formattedTimeline = typeof timeline === 'string' ? JSON.parse(timeline) : timeline;
// //             } catch (e) {
// //                 return res.status(400).json({ message: "Invalid timeline format" });
// //             }
// //         }

// //         let imagesToRemove = [];
// //         if (imagesToDelete) {
// //             try {
// //                 imagesToRemove = typeof imagesToDelete === 'string' ? JSON.parse(imagesToDelete) : imagesToDelete;
// //             } catch (e) {
// //                 return res.status(400).json({ message: "Invalid imagesToDelete format" });
// //             }
// //         }

// //         // --- 2. HANDLE FILE SYSTEM DELETION ---
// //         if (imagesToRemove.length > 0) {
// //             imagesToRemove.forEach(filename => {
// //                 const filePath = path.join(__dirname, '../uploads', filename);
// //                 fs.unlink(filePath, (err) => {
// //                     if (err && err.code !== 'ENOENT') console.error(`Failed to delete file: ${filename}`, err);
// //                 });
// //             });
// //         }

// //         // --- 3. PROCESS NEW IMAGES ---
// //         let newImageFilenames = [];
// //         if (req.files && req.files.length > 0) {
// //             newImageFilenames = req.files.map(file => file.filename);
// //         }

// //         // =========================================================
// //         // FIX START: Handling MongoDB Updates safely
// //         // =========================================================

// //         // STEP A: Perform Deletions First ($pull)
// //         // We do this separately to avoid conflict with $push on the same field
// //         if (imagesToRemove.length > 0) {
// //             await NewEvent.findByIdAndUpdate(id, {
// //                 $pull: { eventImages: { $in: imagesToRemove } }
// //             });
// //         }

// //         // STEP B: Prepare the Main Update ($set and $push)
// //         const updateQuery = {
// //             $set: {
// //                 eventName,
// //                 names,
// //                 ytCode,
// //                 date,
// //                 time,
// //                 location
// //             }
// //         };

// //         // Add timeline to $set if it exists
// //         if (formattedTimeline) {
// //             updateQuery.$set.timeline = formattedTimeline;
// //         }

// //         // Add new images via $push
// //         if (newImageFilenames.length > 0) {
// //             updateQuery.$push = { eventImages: { $each: newImageFilenames } };
// //         }

// //         // STEP C: Execute the Final Update
// //         const updatedEvent = await NewEvent.findByIdAndUpdate(
// //             id,
// //             updateQuery,
// //             { new: true } // This returns the final version of the doc
// //         );

// //         if (!updatedEvent) {
// //             return res.status(404).json({ message: "Event not found" });
// //         }

// //         return res.status(200).json({
// //             message: "Event updated successfully",
// //             event: updatedEvent,
// //             success: true // changed "true" string to boolean true
// //         });

// //     } catch (error) {
// //         console.error("Update Error:", error);
// //         return res.status(500).json({ error: "Internal server error" });
// //     }
// // };


// const updateEvent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let { eventName, names, ytCode, date, time, location, timeline, imagesToDelete } = req.body;

//         // --- 1. Get Existing Event First ---
//         const event = await NewEvent.findById(id);
//         if (!event) {
//             return res.status(404).json({ message: "Event not found" });
//         }

//         // --- 2. Create a Copy of Current Images ---
//         let finalImages = [...event.eventImages];

//         // --- 3. Handle Deletions (Async & Safe) ---
//         if (imagesToDelete) {
//             try {
//                 const deleteArray = typeof imagesToDelete === "string" 
//                     ? JSON.parse(imagesToDelete) 
//                     : imagesToDelete;

//                 // Create an array of delete promises (Don't pause server)
//                 const deletePromises = deleteArray.map(async (filename) => {
//                     // Use robust path finding (Adjust '../uploads' if needed)
//                     const filePath = path.join(__dirname, '../uploads', filename);

//                     // Remove from our list immediately
//                     finalImages = finalImages.filter(img => img !== filename);

//                     // Delete file from disk
//                     if (fs.existsSync(filePath)) {
//                         await fsPromises.unlink(filePath).catch(err => 
//                             console.error(`Failed to delete ${filename}:`, err)
//                         );
//                     }
//                 });

//                 // Wait for all deletions to finish
//                 await Promise.all(deletePromises);

//             } catch (err) {
//                 console.error("Delete parsing error:", err);
//                 return res.status(400).json({ message: "Invalid imagesToDelete format" });
//             }
//         }

//         // --- 4. Add New Images ---
//         if (req.files && req.files.length > 0) {
//             const newImageFilenames = req.files.map(file => file.filename);
//             finalImages = [...finalImages, ...newImageFilenames];
//         }

//         // --- 5. Prepare Update Data ---
//         // Parse timeline safely
//         let formattedTimeline = undefined;
//         if (timeline) {
//             try {
//                 formattedTimeline = typeof timeline === "string" ? JSON.parse(timeline) : timeline;
//             } catch {
//                 return res.status(400).json({ message: "Invalid timeline format" });
//             }
//         }

//         const updateData = {
//             eventName,
//             names,
//             ytCode,
//             date,
//             time,
//             location,
//             eventImages: finalImages // The computed "Final" array
//         };

//         if (formattedTimeline !== undefined) {
//             updateData.timeline = formattedTimeline;
//         }

//         // --- 6. Save with $set ---
//         const updatedEvent = await NewEvent.findByIdAndUpdate(
//             id,
//             { $set: updateData },
//             { new: true }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Event updated successfully",
//             event: updatedEvent
//         });

//     } catch (error) {
//         console.error("Update Error:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

// // CHANGE 3: Use 'upload.array' instead of 'upload.single'
// // 'images' is the key name you must use in Postman
// // 10 is the maximum number of files allowed at once

// module.exports = { addEvent: [upload.array('images', 10), addEvent], getAllEvents, getEvent, deleteEvent, updateEvent};

// // updateEvent: [upload.array('images', 10), updateEvent]


const NewEvent = require("../models/NewEvent");
const Admin = require("../models/Admin");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

// --- 1. Cloudinary Configuration ---
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// --- 2. Multer Storage (Cloudinary) ---
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'events_uploads', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        // transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // Optional resizing
    },
});

const upload = multer({ storage: storage });

// --- Controller Functions ---

const addEvent = async (req, res) => {
    try {
        const { eventName, names, ytCode, date, time, location, timeline } = req.body;

        // CLOUDINARY CHANGE: Files are now at 'req.files' with a 'path' or 'filename'
        // CloudinaryStorage puts the 'public_id' (e.g., 'events_uploads/abc123') into 'file.filename'
        const eventImages = req.files ? req.files.map(file => file.filename) : [];

        let formattedTimeline = [];
        if (timeline) {
            try {
                formattedTimeline = typeof timeline === 'string' ? JSON.parse(timeline) : timeline;
            } catch (error) {
                return res.status(400).json({ message: "Invalid timeline format" });
            }
        }

        const admin = await Admin.findById(req.adminId);
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        const newEvent = new NewEvent({
            eventName,
            names,
            ytCode,
            date,
            time,
            location,
            eventImages, // Stores Cloudinary Public IDs (e.g. "events_uploads/xy782...")
            timeline: formattedTimeline
        });

        await newEvent.save();

        return res.status(200).json({ message: "New event added successfully", success: "true" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const allEvents = await NewEvent.find();
        res.status(200).json({ allEvents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await NewEvent.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "event not found" });
        }
        res.status(200).json({ event });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await NewEvent.findById(eventId);
        
        if (!event) {
            return res.json({ success: false, message: "Event not found" });
        }

        // CLOUDINARY CHANGE: Delete images from Cloudinary
        if (event.eventImages && event.eventImages.length > 0) {
            const deletePromises = event.eventImages.map(publicId => {
                return cloudinary.uploader.destroy(publicId);
            });
            await Promise.all(deletePromises);
        }

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
        let { eventName, names, ytCode, date, time, location, timeline, imagesToDelete } = req.body;

        const event = await NewEvent.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        let finalImages = [...event.eventImages];

        // --- Handle Cloudinary Deletions ---
        if (imagesToDelete) {
            try {
                const deleteArray = typeof imagesToDelete === "string"
                    ? JSON.parse(imagesToDelete)
                    : imagesToDelete;

                if (deleteArray.length > 0) {
                    // 1. Remove from Cloudinary
                    const cloudDeletePromises = deleteArray.map(publicId => 
                        cloudinary.uploader.destroy(publicId)
                    );
                    await Promise.all(cloudDeletePromises);

                    // 2. Remove from Local Array
                    finalImages = finalImages.filter(img => !deleteArray.includes(img));
                }
            } catch (err) {
                console.error("Delete parsing error:", err);
                return res.status(400).json({ message: "Invalid imagesToDelete format" });
            }
        }

        // --- Handle New Uploads ---
        if (req.files && req.files.length > 0) {
            // Multer-Cloudinary puts the Public ID in 'filename'
            const newImageIds = req.files.map(file => file.filename);
            finalImages = [...finalImages, ...newImageIds];
        }

        // --- Prepare Update ---
        let formattedTimeline = undefined;
        if (timeline) {
            try {
                formattedTimeline = typeof timeline === "string" ? JSON.parse(timeline) : timeline;
            } catch {
                return res.status(400).json({ message: "Invalid timeline format" });
            }
        }

        const updateData = {
            eventName,
            names,
            ytCode,
            date,
            time,
            location,
            eventImages: finalImages
        };

        if (formattedTimeline !== undefined) {
            updateData.timeline = formattedTimeline;
        }

        const updatedEvent = await NewEvent.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Export with Upload Middleware
module.exports = { 
    addEvent: [upload.array('images', 10), addEvent], 
    getAllEvents, 
    getEvent, 
    deleteEvent, 
    updateEvent: [upload.array('images', 10), updateEvent]
};

