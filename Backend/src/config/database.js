import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.MONGO_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
