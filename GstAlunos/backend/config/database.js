const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
          
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
