import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const dbUrl = process.env.MONGO_URL;
    if (!dbUrl) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};