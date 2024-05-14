import { Schema, model } from "mongoose";

const AdminModel = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAllowed: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Admin = model("admins", AdminModel);
