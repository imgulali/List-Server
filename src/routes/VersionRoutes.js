import { Router } from "express";
import {
  addVersion,
  deleteVersion,
  fetchAllVersions,
  fetchLatestVersion,
  updateVersion,
} from "../controllers/VersionController.js";
import { verifyAdmin } from "../middlewares/VerifyAdmin.js";
import { validate } from "../middlewares/Validate.js";
import {
  AddVersionSchema,
  DeleteVersionSchema,
  UpdateVersionSchema,
} from "../validators/VersionValidator.js";

const VersionRouter = Router();

VersionRouter.post("/fetch-latest", fetchLatestVersion);
VersionRouter.post("/fetch-all", verifyAdmin ,fetchAllVersions);
VersionRouter.post("/add", verifyAdmin, validate(AddVersionSchema), addVersion);
VersionRouter.post(
  "/update/:id",
  verifyAdmin,
  validate(UpdateVersionSchema),
  updateVersion
);
VersionRouter.post(
  "/delete/:id",
  verifyAdmin,
  validate(DeleteVersionSchema, true),
  deleteVersion
);

export default VersionRouter;
