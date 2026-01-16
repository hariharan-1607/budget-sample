const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Add timeout to fail faster so Vercel doesn't hit its own limit first
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw error;
  }
};

module.exports = connectDB;
