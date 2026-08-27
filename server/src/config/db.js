import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo URI exists:", !!process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Mongo connection failed!");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;