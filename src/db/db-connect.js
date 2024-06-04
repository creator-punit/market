import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}bAAZAR`
    );
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance}`);
  } catch (err) {
    console.error("MONGODB connection failed:", err);
    throw err;
  }
};

export { connectDB };
