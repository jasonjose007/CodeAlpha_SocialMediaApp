const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer = null;

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
      console.log("MONGO_URI not set — starting in-memory MongoDB...");
      mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log("✓ In-memory MongoDB Connected");
    } else {
      await mongoose.connect(uri);
      console.log("✓ MongoDB Connected to:", uri);
    }
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;