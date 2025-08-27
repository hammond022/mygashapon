import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB);
    console.log(`MongDB is connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
