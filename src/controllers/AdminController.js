import { compare } from "bcrypt";
import { Admin } from "../models/AdminModel.js";
import { generateAuthToken, hashPassword } from "../utils/AdminUtils.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    let admin = await Admin.findOne({ username });

    if (admin) {
      return res.error("Authentication Error", "Admin Already Exists", 401);
    }

    const hashedPassword = await hashPassword(password);

    admin = await Admin.create({
      name,
      username,
      password: hashedPassword,
    });

    const { id, isAllowed } = admin;

    if (!isAllowed) {
      return res.error(
        "Authentication Error",
        "You are not allowed to use this app",
        401
      );
    }

    const authToken = await generateAuthToken(id);
    res.success("Admin Registered Successfully", {
      authToken,
      name,
      username,
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.error(
        "Authentication Error",
        "Username or Password is incorrect",
        401
      );
    }

    const comparePasswords = await compare(password, admin.password);
    if (!comparePasswords) {
      return res.error(
        "Authentication Error",
        "Username or Password is incorrect",
        401
      );
    }

    const { id, name, isAllowed } = admin;

    if (!isAllowed) {
      return res.error(
        "Authentication Error",
        "You are not allowed to use this app",
        401
      );
    }

    const authToken = await generateAuthToken(id);
    res.success("Login Successful", { authToken, username, name });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    
    const { id } = req.admin;
    const { name, username, password } = req.body;
    let updatedAdmin = {};

    if (name) updatedAdmin.name = name;
    if (username) {
      if (username == req.user.username) {
        return res.error(
          "Validation Error",
          "New username cannot be same as the old one",
          401
        );
      }

      const admin = await Admin.findOne({ username });
      if (admin) {
        return res.error("Authentication Error", "Username Already Exists", 401);
      }

      updatedAdmin.username = username;
    }
    if (password) {
      updatedAdmin.password = await hashPassword(password);
    }

    updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: updatedAdmin },
      { new: true }
    );
    res.success("Updated Admin Successfully", { name, username });

  } catch (error) {
    next(error);
  }
};

export const fetchAdmin = async (req, res, next) => {
  try {
    const { name, username } = req.admin;
    res.success("Admin Fetched Successfully", { name, username });
  } catch (error) {
    next(error);
  }
};

export const fetchAllAdmins = async (req, res, next) => {
  try {
    let admins = await Admin.find().select("-__v -password");

    if (admins.length == 0) {
      admins = null;
    }

    res.success("All Admins Fetched Successfully", {
      admins,
    });
  } catch (error) {
    next(error);
  }
};
