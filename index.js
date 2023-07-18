const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config()

// User Routes
const userRoutes = require('./routes/userRoutes');

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to DealVary Application." });
// });

// Auth Route..
app.use('/api/auth', userRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});