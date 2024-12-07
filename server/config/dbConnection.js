import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Connect to the database
    await mongoose.connect(mongoURI, {});

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
