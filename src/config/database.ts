import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(String(process.env.MOGODB_URL), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
    console.log("connected with db successfully...!");
  } catch (error) {
    console.log("error at connection->", error);
    process.exit(1);
  }
};

export const baseURl = "http://localhost:3000";
export default ConnectDB;
