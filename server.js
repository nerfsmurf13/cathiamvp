const express = require('express');
const cors = require("cors");
require('dotenv').config();
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require("body-parser");


const mongoose = require("mongoose");

// Connect to DB
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.APPSETTING_MONGO_URI);
    console.log("Connected to MongoDB!!");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// Serve your static files (Vue app)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./cathiamvp/dist'));
app.use("/api", require("./routes/stars"));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'cathiamvp', 'dist', 'index.html'));
});

// Set up a simple API endpoint
// app.get('/api/stars', (req, res) => {
//   res.json({ message: 'Hello from the server!' });
// });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

console.log(process.env.TEST);