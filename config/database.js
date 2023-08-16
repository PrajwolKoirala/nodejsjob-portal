const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/job_portalDB')
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
