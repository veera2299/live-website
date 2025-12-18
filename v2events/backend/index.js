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

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB connected successfully"))
.catch((err)=>console.log(err)
)


// Add this in your main server file (server.js/index.js)
// This makes the 'uploads' folder publicly accessible at http://localhost:5000/uploads/filename.jpg

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use('/admin', adminRoutes, newEventRoutes);
// app.use('/events', newEventRoutes)

app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`);
    
})

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to v2 events")
})