const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()  
const app = express()  

app.use(cors({
    // origin: process.env.CLIENT_URL,
    origin: '*',  //Temporarily for testing
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json())

//Loading routes
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')

//Mount routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

//Connecting to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.error('Database Connection Failed:', err));


process.on('unhandledRejection', err => {
  console.error('Unhandled rejection:', err);
  process.exit(1); // crash safely
});

app.get('/', (req, res) => {
  res.send('Server is running.');
});

//Starting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

module.exports = app;