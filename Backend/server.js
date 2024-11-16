const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./Routes/postRoutes');  
const path=require('path')
const app = express();


app.use(express.json());
app.use(cors());
app.use('/api', postRoutes);


app.use('/api/posts', postRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/your-db-name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
