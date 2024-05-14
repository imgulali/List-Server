import { connect } from "mongoose";
import { MongoURI } from "./Constants.js";

export const connectToDatabse = async () => {
  try {
    await connect(MongoURI);
    console.log("Connected to the Database");
  } catch (error) {
    console.error("Error while connecting to the Database", error);
  }
};
