const express = require("express");
const app = express();
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const bodyParser = require('body-parser')
const newEventRoutes = require("./routes/newEventRoutes")
const path = require('path');
const cors = require('cors');

const PORT = 4000;

dotEnv.config();

//access frontend
app.use(cors());

// ✅ USE NATIVE EXPRESS PARSERS (Replaces body-parser)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB connected successfully"))
.catch((err)=>console.log(err)
)


// Add this in your main server file (server.js/index.js)
// This makes the 'uploads' folder publicly accessible at http://localhost:4000/uploads/filename.jpg


app.use('/admin', adminRoutes);
app.use('/admin', newEventRoutes);
// Mount them separately to ensure they don't conflict


app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`);
    
})

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to v2 events")
})