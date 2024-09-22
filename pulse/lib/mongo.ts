import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connect = await mongoose.connect(String(process.env.MONGO_DB_CONNECTION_STRING));
    return connect
  } catch (e ) {
    console.log(e, "connection error")
  }
}