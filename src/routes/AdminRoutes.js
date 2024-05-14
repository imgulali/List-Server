import { Router } from "express";
import { fetchAdmin, fetchAllAdmins, loginAdmin, registerAdmin, updateAdmin } from "../controllers/AdminController.js";
import { validate } from "../middlewares/Validate.js";
import {
  LoginAdminSchema,
  RegisterAdminSchema,
  UpdateAdminSchema,
} from "../validators/AdminValidator.js";
import { verifyAdmin } from "../middlewares/VerifyAdmin.js";

const AdminRouter = Router();

AdminRouter.post("/login", validate(LoginAdminSchema), loginAdmin);
AdminRouter.post("/register", validate(RegisterAdminSchema), registerAdmin);
AdminRouter.post("/fetch", verifyAdmin, fetchAdmin);
AdminRouter.post("/fetch-all", verifyAdmin, fetchAllAdmins);
AdminRouter.post("/update", verifyAdmin, validate(UpdateAdminSchema), updateAdmin);

export default AdminRouter;
