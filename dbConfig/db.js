import mongoose from "mongoose";

export const ConncectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mk3638432:m15Rv8u6jn9XpwuD@cluster0.yqca5vd.mongodb.net/auth"
    );

    console.log("Connected to Mongo");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
