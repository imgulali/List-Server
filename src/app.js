import express, { json } from "express";
import cors from "cors";
import NodeCache from "node-cache";
import { PORT } from "./config/Constants.js";
import { connectToDatabse } from "./config/Database.js";
import { ErrorHandler } from "./middlewares/ErrorHandler.js";
import { ResponseHandler } from "./middlewares/ResponseHandler.js";
import AdminRouter from "./routes/AdminRoutes.js";
import VersionRouter from "./routes/VersionRoutes.js";

export const nodeCache = new NodeCache();

await connectToDatabse();
const app = express();
app.use(cors());
app.use(json());
app.use(ResponseHandler);

app.get("/", (req, res) => {
  res.json({
      success: true,
      message: "Server is running",
    });
});

app.use("/v1/admin", AdminRouter);
app.use("/v1/version", VersionRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "404! Not Found",
  });
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
