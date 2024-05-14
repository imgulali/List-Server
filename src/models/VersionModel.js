import { Schema, model } from "mongoose";

const VersionModel = new Schema(
  {
    version: {
      type: String,
      required: [true, "App Version"],
      unique: true,
    },
    appLink: {
      type: String,
      required: [true, "App Link is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Version = model("version", VersionModel);