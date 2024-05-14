import jwt from "jsonwebtoken";
import { Admin } from "../models/AdminModel.js";
import { JwtKey } from "../config/Constants.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const authToken = req.header("authToken");
    if (!authToken) {
      return res.error("Authentication Error", "Access Denied", 401);
    }
    const { id } = await jwt.verify(authToken, JwtKey);
    if (id) {
      const admin = await Admin.findById(id);
      if (admin) {
        if (admin.isAllowed) {
          req.admin = {
            id: admin.id,
            name: admin.name,
            username: admin.username,
          };
          next();
        } else {
          return res.error(
            "Authentication Error",
            "You are not allowed to use this app",
            401
          );
        }
      } else {
        return res.error("Authentication Error", "Admin Doesn't Exists", 401);
      }
    } else {
      return res.error("Authentication Error", "Access Denied", 401);
    }
  } catch (error) {
    next(error);
  }
};
