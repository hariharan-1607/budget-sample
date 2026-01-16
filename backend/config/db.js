const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {}); 
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    // Do not exit process, let the server run to report error
    // process.exit(1); 
    throw error;
  }
};

module.exports = connectDB;
