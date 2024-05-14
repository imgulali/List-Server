import { configDotenv } from "dotenv"
configDotenv();

export const PORT = process.env.PORT || 5000;
export const MongoURI = process.env.MongoURI;
export const JwtKey = process.env.JwtKey;