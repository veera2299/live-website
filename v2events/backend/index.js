const express = require("express");
const app = express();
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const bodyParser = require('body-parser')
const newEventRoutes = require("./routes/newEventRoutes")

const PORT = 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB connected successfully"))
.catch((err)=>console.log(err)
)

app.use(bodyParser.json());
app.use('/admin', adminRoutes);
app.use('/events', newEventRoutes)

app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`);
    
})

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to v2 events")
})