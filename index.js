// server/index.js
const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const cors = require('cors')

const auth = require('./middleware/verifyToken')

const app = express();


// Middleware
app.use(cors())
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello from the Node backend!');
});

// Auth
app.use(auth)
app.use('/auth', authRouter)
app.use('/task', taskRouter)







const uri = process.env.MONGO_URI;
console.log('Mongo uri: ', uri);
const PORT = process.env.PORT;
mongoose.connect(uri)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
